import { get_width } from "../utils/savingsUtils"

const ProgressBar = ({progress}) => {
    // const [progress, setProgress] = useState(2)
    const get_color = () => {
        if (progress < 20) {
            return 'bg-red-600' 
        } else if (progress < 40) {
            return 'bg-red-400' 
        } else if (progress < 70) {
            return 'bg-yellow-500'
        } else {
            return 'bg-green-500'
        }
    }


  return (
    <div className='mt-3'>
        <div className="w-full border-r-2 rounded-full bg-gray-300 mb-3 overflow-hidden">
            <div className={`h-full rounded-full ${get_width(progress)} ${get_color()} transition ease-out`}>
            <p className={`pl-${progress} ${get_color()} `}>~</p>
            </div>
        </div>
        <p className="block pl-8 font-bold text-teal-700  text-xl text-center">{progress} %</p>
    </div>
  )
}

export default ProgressBar