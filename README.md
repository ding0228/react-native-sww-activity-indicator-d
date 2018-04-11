引用自 ：shiwenwen/react-native-sww-activity-indicator
源码地址：https://github.com/shiwenwen/react-native-sww-activity-indicator


兼容ios android的ActivityIndicator 支持文字指示（例如显示进度）， 菊花会有个透明背景遮挡住下面的所有视图，拦截住点击
###使用方法

	import SActivityIndicator from 'react-native-sww-activity-indicator';
	//在任意需要显示菊花的地方 （
        SActivityIndicator.show(animated=true,message)
        SActivityIndicator.show(animated=true,message，time)
        会返回一个菊花的实例对象
        //animated 出现和消失的时候是否带动画
        //message 文字指示的内容 可空，则不显示
        //time 显示时长(秒/s)
        
        //更新菊花内容
        SActivityIndicator.updateMessage(AIV,message);
        SActivityIndicator.updateMessage(AIV,message,time);
        //AIV:需要更新的菊花的实例
        //time 显示时长(秒/s)

	    //在操作完成需要隐藏菊花的时候
		SActivityIndicator.hide(AIV) 
		//AIV:需要隐藏的菊花的实例
		
		
###示例
 ![image](https://github.com/shiwenwen/react-native-sww-activity-indicator/blob/master/SActivityIndicator.gif)

		





