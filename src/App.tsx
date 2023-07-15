import Button from "components/button"
import FormItem from "components/form-item"
import Input, { InputAddon } from "components/input"
import { Mail } from "lucide-react"

function App() {
  return (
    <main>
      <header className="container py-10">
        <h1 className="text-5xl font-600 text-slate-600">Custom components</h1>
      </header>

      {/* Input */}
      <section className="container">
        <h2 className="mb-6 text-2xl">Input</h2>
        <div className="flex flex-wrap items-center gap-6">
          <Input placeholder="Place text here" />
          <Input placeholder="Place text here" affix={<Mail size={20} />} />
          <div className="flex">
            <InputAddon>http://</InputAddon>
            <Input className="rounded-none" placeholder="Place text here" />
            <InputAddon position="end">.com</InputAddon>
          </div>
          <Input placeholder="Place text here" theme="borderless" />
          <Input placeholder="Place text here" error />
          <Input placeholder="Place text here" disabled />
        </div>
      </section>

      {/* Form Item */}
      <section className="container">
        <h2 className="my-6 text-2xl">Form Item</h2>
        <div className="flex flex-wrap gap-6">
          <FormItem label="Username">
            <Input placeholder="Place text here" />
          </FormItem>

          <FormItem error="Error!" label="Username">
            <Input placeholder="Place text here" />
          </FormItem>

          <FormItem label="With id">
            {(id) => <Input id={id} placeholder="with id" />}
          </FormItem>
        </div>
      </section>

      <section className="container">
        <h2 className="my-6 text-2xl">Buttons</h2>
        <div className="flex flex-wrap gap-6">
          <Button size="sm">Button</Button>
          <Button>Button</Button>
          <Button size="lg">Button</Button>
          <Button size="xl">Button</Button>
        </div>

        <div className="flex flex-wrap gap-6 mt-2">
          <Button theme="danger">Button</Button>
          <Button>Button</Button>
          <Button theme="default-borderred">Button</Button>
          <Button theme="danger-borderred">Button</Button>
        </div>
      </section>
    </main>
  )
}

export default App
