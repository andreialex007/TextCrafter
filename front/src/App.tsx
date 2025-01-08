import './App.css'
import {observer} from "mobx-react-lite";
import AppStore from './AppStore'

let store = new AppStore();

export default observer(() => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold">Counter: {store.count}</h1>
            <div className="mt-4 space-x-4">
                <button
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                    onClick={() => store.increment()}
                >
                    Increment
                </button>
                <button
                    className="px-4 py-2 text-white bg-red-500 rounded"
                    onClick={() => store.decrement()}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
});
