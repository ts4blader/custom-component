import Input, { InputAddon } from "components/input"
import { Mail } from "lucide-react"

function App() {
  return (
    <main>
      <header className="container py-10">
        <h1 className="text-5xl font-600 text-slate-600">Custom components</h1>
      </header>

      <section className="container">
        <h2 className="text-2xl mb-6">Input</h2>
        <div className="flex gap-6 items-center">
          <Input placeholder="Place text here" />
          <Input placeholder="Place text here" affix={<Mail size={20} />} />
          <div className="flex">
            <InputAddon>http://</InputAddon>
            <Input className="rounded-none" placeholder="Place text here" />
            <InputAddon position="end">.com</InputAddon>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
