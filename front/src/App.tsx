import './App.css';
import { observer } from 'mobx-react-lite';
import AppStore from './AppStore';

let store = new AppStore();

export default observer(() => {
	return (
		<div className="flex min-h-screen flex-col">
			<div
				className="flex gap-3 bg-gradient-to-b from-gray-300 to-gray-200 p-3 shadow-sm child:flex
				child:cursor-pointer child:items-center child:gap-2 child:rounded child:bg-white child:p-2 child:px-4
				child:text-black child:shadow-md hover:child:opacity-80 "
			>
				<div>
					<i className="fa fa-file-lines"></i>
					Prompts
				</div>
				<div>
					<i className="fa fa-user"></i>
					Users
				</div>
				<div>
					<i className="fa fa-wrench"></i>
					Settings
				</div>
				<div className="flex-grow cursor-default bg-transparent shadow-none"></div>
				<div>
					<i className="fa fa-person-running"></i>
					Logout
				</div>
			</div>
			<div className="p-5">Main content</div>
		</div>
	);
});
