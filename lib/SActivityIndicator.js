/**
 * Created by Shiwenwen on 16/9/27.
 */

import React,{Component} from 'react';
import { PropTypes} from 'prop-types';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Dimensions,
  Animated,
  Easing,
  Text,
  Image,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings'
var {width, height} = Dimensions.get('window');

const  ANIMATED_DURATION = 250;
export default class SActivityIndicator extends Component{
  static animated = true
  static message = ''

  /**
   * 显示菊花
   * @param animated 是否显示出现和消失动画
   * @param message 菊花底部文字
   * @returns {SiblingsManager}
   */
  static show(animated=true,message){
    SActivityIndicator.animated = animated
    SActivityIndicator.message = message
    let root = new RootSiblings(<ActivityIndicatorContent
    animated={animated}
    message={message}
    />)

    return root
  }

  /**
   * 显示菊花(给定事件后自动销毁)
   * @param animated 是否显示出现和消失动画
   * @param message 菊花底部文字
   * @param timeLen 菊花显示时长(单位秒(s))，默认2秒
   */
  static show(animated=true,message,timeLen){
    SActivityIndicator.animated = animated
    SActivityIndicator.message = message
    let root = new RootSiblings(<ActivityIndicatorContent
    animated={animated}
    message={message}
    />)

    this.timer =setTimeout(()=>{
      this.hide(root);
  },timeLen === 0?2000:timeLen*1000);

    return root
  }
  /**
   * 显示菊花(给定事件后自动销毁)
   * @param animated 是否显示出现和消失动画
   * @param message 菊花底部文字
   * @param timeLen 菊花显示时长(单位秒(s))，默认2秒
   */
  static showSuccess(AIV,message,timeLen){
    SActivityIndicator.message = message
    if (AIV instanceof RootSiblings) {
      AIV.update(<ActivityIndicatorContent
      showType = {1}
      message={message}
      />)
      this.timer =setTimeout(()=>{
        this.hide(AIV);
    },timeLen === 0?2000:timeLen*1000);
      return AIV;
    }else{
      let root = new RootSiblings(<ActivityIndicatorContent
      showType = {1}
      message={message}
      />)

      this.timer =setTimeout(()=>{
        this.hide(root);
    },timeLen === 0?2000:timeLen*1000);
      return root
    }
  }
  /**
   * 显示菊花(给定事件后自动销毁)
   * @param animated 是否显示出现和消失动画
   * @param message 菊花底部文字
   * @param timeLen 菊花显示时长(单位秒(s))，默认2秒
   */
  static showFailure(AIV,message,timeLen){
    SActivityIndicator.message = message
    if (AIV instanceof RootSiblings) {
      AIV.update(<ActivityIndicatorContent
      showType = {2}
      message={message}
      />)
      this.timer =setTimeout(()=>{
        this.hide(AIV);
    },timeLen === 0?2000:timeLen*1000);
      return AIV;
    }else{
      let root = new RootSiblings(<ActivityIndicatorContent
      showType = {2}
      message={message}
      />)

      this.timer =setTimeout(()=>{
        this.hide(root);
    },timeLen === 0?2000:timeLen*1000);
      return root
    }
  }

  /**
   * 隐藏菊花
   * @param AIV 需要隐藏的菊花
   */
  static hide(AIV){
    if (AIV instanceof RootSiblings) {

      AIV.update(<ActivityIndicatorContent
      animated={SActivityIndicator.animated}
      message={SActivityIndicator.message}
      isHide={true}
      />)
    }
  }

  /**
   * 更新菊花文字
   * @param AIV 需要更新文字的菊花
   * @param message 文字内容
   */
  static  updateMessage(AIV,message){
    AIV.update(<ActivityIndicatorContent
    animated={SActivityIndicator.animated}
    message={message}
    />)
  }

  /**
   * 更新菊花文字给定时间后自动销毁
   * @param AIV 需要更新文字的菊花
   * @param message 文字内容
   * @param timeLen 菊花显示时长(单位秒(s))，默认2秒
   */
  static  updateMessage(AIV,message,timeLen){
    AIV.update(<ActivityIndicatorContent
    animated={SActivityIndicator.animated}
    message={message}
    />)
    this.timer =setTimeout(()=>{
      this.hide(AIV);
  },timeLen === 0?2000:timeLen*1000);
  }

};

/**
 * 菊花内部模块
 */
class ActivityIndicatorContent extends Component{

  constructor(props) {
    super(props);
    this.state = {
      opacity:new Animated.Value(0)
    };
  }

  static defaultProps={
    animated:true,
    isHide:false,
    showType:0
  }
  static propTypes={
    animated:PropTypes.bool,
    message:PropTypes.string,
    updateMessage:PropTypes.func,
    isHide:PropTypes.bool
  }
  render(){
    if(this.props.isHide){
      return null;
    }else{
      return(
        <View style={[styles.background,this.props.styles]}>
      {this._showIcon(this.props.showType)}
    </View>
    )
    }
  }

  _showIcon(showType) {

    var newHeight = 0.3*(width>height?height:width);
    var newWidth = 0.3*(width>height?height:width)-30;
    var source = require('./Image/success.png');
    if(showType === 0){
      return(
        <Animated.View style={[styles.activeBg,{opacity:this.state.opacity},{height:this.props.message.length>0?newHeight:newWidth}]}>

    <ActivityIndicator
      animating={true}
      size="large"
        />
        {this._messageView()}
    </Animated.View>
    )
    }else if(showType === 2){
      source = require('./Image/error.png')
    }

    return(
      <View style={[styles.activeBg,{height:this.props.message.length>0?newHeight:newWidth}]}>
  <Image source = {source} style = {styles.iconStyle}>

  </Image>
    {this._messageView()}

  </View>
  )
  }




  _messageView(){
    if (this.props.message.length>0){
      return(
        <Text style={styles.message}>
      {this.props.message}
    </Text>
    )
    }else{
      return null;
    }
  }
  componentDidMount() {
    this._show();

  }

  componentDidUpdate() {
    if (this.props.isHide) {
      this._hide()
    }
  }
  componentWillUnmount(){
    this._hide();
  };
  _show(){
    Animated.timing(this.state.opacity,{
      toValue: 1,
      duration: this.props.animated ? ANIMATED_DURATION : 0,
      easing: Easing.out(Easing.ease)
    }).start()

  }
  _hide(){
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: this.props.animated ? ANIMATED_DURATION : 0,
      easing: Easing.in(Easing.ease)
    }).start(({finished})=>{
      if(finished){
        // this.props.siblingManager.destroy()
      }
    });
  };
}




const styles = StyleSheet.create({
  background:{
    backgroundColor:'rgba(0,0,0,0.05)',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    width:width,
    height:height,
    left:0,
    top:0
  },
  activeBg:{
    padding:15,
    backgroundColor:'#fff',
    borderRadius:7,
    justifyContent:'center',
    alignItems:'center',
    height:0.3*(width>height?height:width),
    minWidth:0.3*(width>height?height:width)-30
  },
  message:{
    color:'#000',
    fontSize:15,
    marginTop:15,
    opacity:1,
    textAlign:"center",
    minWidth:0.3*(width>height?height:width)-30
  },
  iconStyle:{
    height:(0.3*(width>height?height:width)-30)/2,
    width:(0.3*(width>height?height:width)-30)/2,
  }

});
