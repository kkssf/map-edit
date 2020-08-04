const state = {
  areaList: [],
  addFlag: false,
  pointAreaIndex:null
}
const getters = {
  getAreaList: state => {
    return state.areaList
  },
  getAddFlag: state => {
    return state.addFlag
  },
  getPointIndex:state =>{
    return state.pointAreaIndex
  }
}
const mutations = {
  setAreaList (state, areaObj) {
    state.areaList.push(areaObj)
  },
  setPointIndex(state,index){
    state.pointAreaIndex=index
  },
  setAddFlag (state, flag) {
    state.addFlag = flag
  },
  configAreaList (state, obj) {
    state.areaList.splice(obj.index,1,obj.obj)  
  },
  delAreaList(state,index){
    state.areaList.splice(index,1)
  },
  mergeAreaList(state,obj){
    let indexEnd = obj.indexList.length-1
    for(let i = indexEnd;i>=0;i--){
      state.areaList.splice(obj.indexList[i],1)
    }
    state.areaList.push(obj.obj)
  }
}
export default {
  state,
  getters,
  mutations
}