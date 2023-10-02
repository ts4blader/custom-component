import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useList } from "react-use"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "utils/helper"
import { useMemo, useState } from "react"
import {
  Active,
  DndContext,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core"

interface ItemProps {
  text: string
  value: string
}

const Item = ({ text, value }: ItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: value })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      className={cn(
        "px-4 py-2 rounded-md bg-slate-100 relative touch-none select-none",
        isDragging && "shadow-sm z-10 opacity-40",
        "flex items-center justify-between"
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <span>{text}</span>
      <span {...listeners}>handler</span>
    </li>
  )
}

const TestDND = () => {
  const [list, { set }] = useList(["1", "2", "3"])
  const [active, setActive] = useState<Active | null>()

  const activeItem = useMemo(
    () => list.find((item) => item === active?.id),
    [list, active]
  )

  return (
    <DndContext
      onDragStart={({ active }) => {
        setActive(active)
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          const oldIndex = list.findIndex((item) => item === active.id)
          const newIndex = list.findIndex((item) => item === over.id)

          set(arrayMove(list, oldIndex, newIndex))
        }

        setActive(null)
      }}
      onDragCancel={() => {
        setActive(null)
      }}
    >
      <SortableContext items={list} strategy={verticalListSortingStrategy}>
        <ul className="space-y-4 list-none" role="application">
          {list.map((item) => (
            <Item key={item} text={item} value={item} />
          ))}
        </ul>
      </SortableContext>

      <DragOverlay
        dropAnimation={{
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: "0.4",
              },
            },
          }),
        }}
      >
        {activeItem && <Item text={activeItem} value={activeItem} />}
      </DragOverlay>
    </DndContext>
  )
}

export default TestDND
