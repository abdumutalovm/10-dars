import './App.css'
import Card from './components/Card'
import Card1 from './components/Card1'
import Card2 from './components/Card2'

function App() {


  return (
    <div className='w-[1030px] flex justify-between items-start mx-auto px-16 py-4'>
      <Card></Card>
      <Card1></Card1>
      <Card2></Card2>
    </div>
  )
}

export default App
