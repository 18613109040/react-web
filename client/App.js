import React, {Component,PropTypes} from "react";
import { Link } from "react-router";
import MallNavBar from './components/MallNavBar'
import TabBar from './components/TabBar'
class App extends Component {
	static propTypes = {

	};

	static defaultProps = {

	};
	constructor(props) {
		super(props);
		this.state = {
			
		}
	
	}
	
	render() {
		const {pathname} = this.props.location;
		return(
				<div>
					<MallNavBar/>
					{this.props.children}
					<TabBar/>
				</div>
		)	
	}
}
export default App