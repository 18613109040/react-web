import React, {Component,PropTypes} from "react";
import {  TabBar, Icon } from 'antd-mobile';
class MallNavBar extends Component {
	static propTypes = {
		tabBarData:PropTypes.array,
		badge:PropTypes.any,  //徽章数
		dot:PropTypes.bool   //小红点 
	};

	static defaultProps = {
		tabBarData:[
			{
				title:"首页",
				icon:"icon-home",
				selectName:"home",
				selectIcon:"icon-home icon-select",
			},{
				title:"分类",
				icon:"icon-fenlei",
				selectName:"fenlei",
				selectIcon:"icon-fenlei icon-select",
			},{
				title:"购物车",
				icon:"icon-shopcar",
				selectName:"shopcar",
				selectIcon:"icon-shopcar icon-select",
			},{
				title:"我的",
				icon:"icon-myinfo",
				selectName:"myinfo",
				selectIcon:"icon-myinfo icon-select",
			}
		],
		badge:"",
		dot:false
	};
	constructor(props) {
		super(props);
		this.state = {
			selectedTab:"home",
			hidden:false
		}
		 
	}

	render() {
		return(
			<div>
				<TabBar
	        unselectedTintColor="#949494"
	        tintColor="red"
	        barTintColor="white"
	        hidden={this.state.hidden}
	      >  
	      	{
	      		this.props.tabBarData.map((item,id)=>(
	      			<TabBar.Item
			          title={item.title}
			          key={id}
			          icon={<div className={`iconfont ${item.icon}`}></div>}
			          selectedIcon={<div className={`iconfont ${item.selectIcon}`}></div>}
			          selected={this.state.selectedTab === item.selectName}
			          badge={this.props.badge}
			          dot ={this.props.dot}
			          onPress={() => {
			          	this.setState({
				            selectedTab: item.selectName,
				          });
			          }}
			        >
			        
			        </TabBar.Item>	
	      		))
	      	}
			 	</TabBar>
			</div>
		)	
	}
}
export default MallNavBar