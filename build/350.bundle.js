"use strict";exports.id=350,exports.ids=[350,46],exports.modules={46:(t,s,e)=>{e.r(s),e.d(s,{default:()=>r});const r=new function(){var t=this;this.posts=[{name:"Marcin",author:"Dolor sit amet",title:"Lorem Ipsum"}],this.getAllUsers=function(s,e){e.send(t.posts)},this.createAUser=function(s,e){var r=s.body;t.posts.push(r),e.send(r)}}},350:(t,s,e)=>{e.r(s),e.d(s,{default:()=>i});var r=e(860),o=e(46);const i=(new function(){this.path="/users",this.controller=o.default,this.router=r.Router(),this.router.get(this.path,this.controller.getAllUsers),this.router.post(this.path,this.controller.createAUser),this.router.delete(this.path,this.controller.getAllUsers),this.router.put(this.path,this.controller.getAllUsers)}).router}};