

import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { connect } from 'dva'
import moment from 'moment'
import BooleanOption from 'components/BooleanOption';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,Badge, Switch,Select,Form,AutoComplete,Modal } from 'antd'
import { Link, Route, Redirect} from 'dva/router'
import numeral from 'numeral'
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../components/Charts'
import Trend from '../../components/Trend'
import NumberInfo from '../../components/NumberInfo'
import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './DamageSpace.dashboard.less'
import DescriptionList from '../../components/DescriptionList';
import ImagePreview from '../../components/ImagePreview';
import GlobalComponents from '../../custcomponents';
import DashboardTool from '../../common/Dashboard.tool'


const {aggregateDataset,calcKey, defaultHideCloseTrans,
  defaultImageListOf,defaultSettingListOf,defaultBuildTransferModal,
  defaultExecuteTrans,defaultHandleTransferSearch,defaultShowTransferModel,
  defaultRenderExtraHeader,
  defaultSubListsOf,
  defaultRenderExtraFooter,renderForTimeLine,renderForNumbers
}= DashboardTool



const { Description } = DescriptionList;
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Option } = Select


const imageList =(damageSpace)=>{return [
	 ]}

const internalImageListOf = (damageSpace) =>defaultImageListOf(damageSpace,imageList)

const optionList =(damageSpace)=>{return [ 
	]}

const buildTransferModal = defaultBuildTransferModal
const showTransferModel = defaultShowTransferModel
const internalSettingListOf = (damageSpace) =>defaultSettingListOf(damageSpace, optionList)
const internalLargeTextOf = (damageSpace) =>{

	return null
	

}







const internalRenderExtraHeader = defaultRenderExtraHeader




const internalRenderExtraFooter = defaultRenderExtraFooter
const internalSubListsOf = defaultSubListsOf

const internalSummaryOf = (damageSpace,targetComponent) =>{
	
	
	const {DamageSpaceService} = GlobalComponents
	
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="序号">{damageSpace.id}</Description> 
<Description term="位置">{damageSpace.location}</Description> 
<Description term="联系电话">{damageSpace.contactNumber}</Description> 
<Description term="总面积">{damageSpace.totalArea}</Description> 
<Description term="纬度">{damageSpace.latitude}</Description> 
<Description term="经度">{damageSpace.longitude}</Description> 
<Description term="仓库">{damageSpace.warehouse==null?"未分配":damageSpace.warehouse.displayName}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"仓库","warehouse",DamageSpaceService.requestCandidateWarehouse,
	      DamageSpaceService.transferToAnotherWarehouse,"anotherWarehouseId",damageSpace.warehouse?damageSpace.warehouse.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
	
        {buildTransferModal(damageSpace,targetComponent)}
      </DescriptionList>
	)

}


class DamageSpaceDashboard extends Component {

 state = {
    transferModalVisiable: false,
    candidateReferenceList: {},
    candidateServiceName:"",
    candidateObjectType:"city",
    targetLocalName:"城市",
    transferServiceName:"",
    currentValue:"",
    transferTargetParameterName:"",  
    defaultType: 'damageSpace'


  }
  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const { id,displayName, goodsShelfListMetaInfo, goodsShelfCount } = this.props.damageSpace
    if(!this.props.damageSpace.class){
      return null
    }
    const cardsData = {cardsName:"残次货物存放区",cardsFor: "damageSpace",cardsSource: this.props.damageSpace,
  		subItems: [
{name: 'goodsShelfList', displayName:'货架',type:'goodsShelf',count:goodsShelfCount,addFunction: true, role: 'goodsShelf', metaInfo: goodsShelfListMetaInfo},
    
      	],
  	};
    //下面各个渲染方法都可以定制，只要在每个模型的里面的_features="custom"就可以得到定制的例子
    
    const renderExtraHeader = this.props.renderExtraHeader || internalRenderExtraHeader
    const settingListOf = this.props.settingListOf || internalSettingListOf
    const imageListOf = this.props.imageListOf || internalImageListOf
    const subListsOf = this.props.subListsOf || internalSubListsOf
    const largeTextOf = this.props.largeTextOf ||internalLargeTextOf
    const summaryOf = this.props.summaryOf || internalSummaryOf
    const renderExtraFooter = this.props.renderExtraFooter || internalRenderExtraFooter
    return (

      <PageHeaderLayout
        title={`${cardsData.cardsName}: ${displayName}`}
        content={summaryOf(cardsData.cardsSource,this)}
        wrapperClassName={styles.advancedForm}
      >
      {renderExtraHeader(cardsData.cardsSource)}
        <div>
        {settingListOf(cardsData.cardsSource)}
        {imageListOf(cardsData.cardsSource)}
        {subListsOf(cardsData)} 
        {largeTextOf(cardsData.cardsSource)}
          
        </div>
      </PageHeaderLayout>
    )
  }
}

export default connect(state => ({
  damageSpace: state._damageSpace,
}))(Form.create()(DamageSpaceDashboard))
