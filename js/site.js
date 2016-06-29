
(function($){
  
  var Renderer = function(elt){
    var dom = $(elt)
    var canvas = dom.get(0)
    var ctx = canvas.getContext("2d");
    var gfx = arbor.Graphics(canvas)
    var sys = null

    var _vignette = null
    var selected = null,
        nearest = null,
        _mouseP = null;

    
    var that = {
      init:function(pSystem){
        sys = pSystem
        sys.screen({size:{width:dom.width(), height:dom.height()}});
        that.resize()
        that._initMouseHandling()
      },
      resize:function(){
        canvas.width = .83 * window.innerWidth;
        canvas.height = .73* window.innerHeight;
        sys.screen({size:{width:canvas.width, height:canvas.height}})
        _vignette = null
        that.redraw()
      },
      redraw:function(){
        gfx.clear()
        sys.eachEdge(function(edge, p1, p2){
          if (edge.source.data.alpha * edge.target.data.alpha == 0) return
          gfx.line(p1, p2, {stroke:"#b2b19d", width:2, alpha:edge.target.data.alpha})
        })
        sys.eachNode(function(node, pt){
          var w = 0.02 * window.innerWidth + gfx.textWidth(node.data.label)
          if (node.data.alpha===0) return
          if (node.data.shape=='dot'){
            gfx.oval(pt.x-w/2, pt.y-w/2, w, w, {fill:node.data.color, alpha:node.data.alpha})            
            gfx.text(node.data.label, pt.x, pt.y+7, {color:"white", align:"center", font:"Arial", size:12})
            gfx.text(node.data.label, pt.x, pt.y+7, {color:"white", align:"center", font:"Arial", size:12})
          }else{
            gfx.rect(pt.x-w/2, pt.y-8, w, 20, 4, {fill:node.data.color, alpha:node.data.alpha})           
            gfx.text(node.data.label, pt.x, pt.y+9, {color:"white", align:"center", font:"Arial", size:12})
            gfx.text(node.data.label, pt.x, pt.y+9, {color:"white", align:"center", font:"Arial", size:12})
          }
        })
        that._drawVignette()
      },
      
      _drawVignette:function(){
        var w = canvas.width
        var h = canvas.height
        var r = 20

        if (!_vignette){
          var top = ctx.createLinearGradient(0,0,0,r)
          top.addColorStop(0, "#e0e0e0")
          top.addColorStop(.7, "rgba(255,255,255,0)")

          var bot = ctx.createLinearGradient(0,h-r,0,h)
          bot.addColorStop(0, "rgba(255,255,255,0)")
          bot.addColorStop(1, "white")

          _vignette = {top:top, bot:bot}
        }
        
        // top
        ctx.fillStyle = _vignette.top
        ctx.fillRect(0,0, w,r)

        // bot
        ctx.fillStyle = _vignette.bot
        ctx.fillRect(0,h-r, w,r)
      },

      switchMode:function(e){
        if (e.mode=='hidden'){
          dom.stop(true).fadeTo(e.dt,0, function(){
            if (sys) sys.stop()
            $(this).hide()
          })
        }else if (e.mode=='visible'){
          dom.stop(true).css('opacity',0).show().fadeTo(e.dt,1,function(){
            that.resize()
          })
          if (sys) sys.start()
        }
      },
      
      switchSection:function(newSection){
        var parent = sys.getEdgesFrom(newSection)[0].source
        var children = $.map(sys.getEdgesFrom(newSection), function(edge){
          return edge.target
        })
        
        sys.eachNode(function(node){
          if (node.data.shape=='dot') return // skip all but leafnodes

          var nowVisible = ($.inArray(node, children)>=0)
          var newAlpha = (nowVisible) ? 1 : 0
          var dt = (nowVisible) ? .5 : .5
          sys.tweenNode(node, dt, {alpha:newAlpha})

          if (newAlpha==1){
            node.p.x = parent.p.x + .05*Math.random() - .025
            node.p.y = parent.p.y + .05*Math.random() - .025
            node.tempMass = .001
          }
        })
      },
      
      
      _initMouseHandling:function(){
        // no-nonsense drag and drop (thanks springy.js)
        selected = null;
        nearest = null;
        var dragged = null;
        var oldmass = 1

        var _section = null

        var handler = {
          moved:function(e){
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            nearest = sys.nearest(_mouseP);

            if (!nearest.node) return false

            var parentNode = ['mukul','edu','pro','hobbies', 'trainings', 'certificates'];
            if (nearest.node.data.shape!='dot'){
              selected = (nearest.distance < 50) ? nearest : null
            }else if ($.inArray(nearest.node.name, parentNode) >=0 ){
              if (nearest.node.name!=_section){
                _section = nearest.node.name
                that.switchSection(_section)
              }
            }
            
            return false
          },
          clicked:function(e){
            var pos = $(canvas).offset();
            console.log(pos);
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            nearest = dragged = sys.nearest(_mouseP);

            if (nearest && selected && nearest.node===selected.node){
              var link = selected.node.data.link
              return false
            }
            
            
            if (dragged && dragged.node !== null) dragged.node.fixed = true

            $(canvas).unbind('mousemove', handler.moved);
            $(canvas).bind('mousemove', handler.dragged)
            $(window).bind('mouseup', handler.dropped)

            return false
          },
          dragged:function(e){
            var old_nearest = nearest && nearest.node._id
            var pos = $(canvas).offset();
            var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

            if (!nearest) return
            if (dragged !== null && dragged.node !== null){
              var p = sys.fromScreen(s)
              dragged.node.p = p
            }

            return false
          },

          dropped:function(e){
            if (dragged===null || dragged.node===undefined) return
            if (dragged.node !== null) dragged.node.fixed = false
            dragged.node.tempMass = 1000
            dragged = null;
            // selected = null
            $(canvas).unbind('mousemove', handler.dragged)
            $(window).unbind('mouseup', handler.dropped)
            $(canvas).bind('mousemove', handler.moved);
            _mouseP = null
            return false
          }


        }

        $(canvas).mousedown(handler.clicked);
        $(canvas).mousemove(handler.moved);

      }
    }
    
    return that
  }

  
  $(document).ready(function(){
    var data = {
        nodes: {
          mukul: { color :'purple',   shape :'dot',   label :'Mukul', },
          edu  : { color :'navy',  shape :'dot',  label :'Education'},
          pro  : { color :'navy',  shape : 'dot',  label :'Professional'},
          hobbies : { color :'navy', shape:'dot', label :'Hobbies'},
          certificates : { color :'navy', shape:'dot', label :'Certificates'},
          trainings : { color :'navy', shape:'dot', label :'Trainings'},
          2006 : { color :'green', alpha: 0, label :'10th'},
          2008 : { color :'green', alpha: 0,label :'12th'},
          2009 : { color :'green', alpha: 0,label :'B.Tech'},
          2015 : { color :'green', alpha: 0, label :'Gramener'},
          music : { color :'green', alpha: 0, label :'Music'},
          netsurfing : { color :'green', alpha: 0, label :'Net Surfing'},
          games : { color :'green', alpha: 0, label :'Video Games'},
          rhcsa : { color :'green', alpha: 0, label :'RHCSA'},
          rhce : { color :'green', alpha: 0, label :'RHCE'},
          amcat : {color: 'green', alpha: 0, label : 'AMCAT Certified SE' },
          db2 : {color: 'green', alpha: 0, label : 'IBM DB2 Workshop' },
          cloud : {color: 'green', alpha: 0, label : 'IBM Cloud Computing' },
          php : {color: 'green', alpha: 0, label : 'PHP Training' }
        },
        edges: {
          mukul : { 
            edu : {length: 10.5},
            pro : {length: 10.5}, 
            hobbies : {length: 10.5}, 
            certificates : {length: 10.5},
            trainings : {length: 10.5}, 
          },
          edu : { 
            2006: {length: 4.5}, 
            2008: {length: 4.5}, 
            2009: {length: 4.5} 
          },
          pro : { 
            2015: {length: 4.5} 
          },
          hobbies : { 
            music: {length: 4.5}, 
            netsurfing: {length: 4.5}, 
            games: {length: 4.5}
          },
          certificates : { 
            rhcsa: {length: 4.5},
            rhce: {length: 4.5},
            amcat: {length: 4.5},
          },
          trainings : {
            db2: {length: 4.5},
            cloud: {length: 4.5},
            php : { length : 4.5}
          }
        }
    }


    var sys = arbor.ParticleSystem()
    sys.parameters({stiffness: 200, repulsion:2000, gravity:false, dt:0.020})
    sys.renderer = Renderer("#viewport")
    sys.graft(data)
    
  })
})(this.jQuery)