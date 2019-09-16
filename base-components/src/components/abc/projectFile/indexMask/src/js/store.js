const store = new Vuex.Store({
    state: {
      infoPop:{
          from:'',
          focus:true
      }
    },
    mutations: {
        infoPop(state,payload){
            console.log(payload.self,state.infoPop);
            state.infoPop.from = payload.self;
            state.infoPop.focus = !state.infoPop.focus;
            console.log(state.infoPop.focus)
        }
    }
  })