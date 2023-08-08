(this["webpackJsonpphonebook-step12"]=this["webpackJsonpphonebook-step12"]||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(13),c=t.n(r),u=t(2),l=function(e){var n=e.filterName,t=e.setFilterName;return o.a.createElement("div",{className:"form"},"filter shown with ",o.a.createElement("input",{value:n,onChange:function(e){t(e.target.value)}}))},i=function(e){var n=e.addName,t=e.newName,a=e.newNumber,r=e.handleNameChange,c=e.handleNumberChange;return o.a.createElement("form",{onSubmit:n},o.a.createElement("div",{className:"form"},o.a.createElement("label",null,"name: ",o.a.createElement("input",{value:t,onChange:r}))),o.a.createElement("div",null,o.a.createElement("label",null,"number: ",o.a.createElement("input",{value:a,onChange:c}))),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},m=function(e){var n=e.persons,t=e.filterName,a=e.removePerson,r=n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));return 0===r.length?o.a.createElement("p",null,"not any match"):r.map((function(e){return o.a.createElement("div",{key:e.name},e.name," ",e.number," ",o.a.createElement("button",{className:"button",value:e.name,onClick:function(){return a(e)}}," ","delete"," "))}))},s=t(3),f=t.n(s),d="http://localhost:3001/api/persons",h=function(){return f.a.get(d).then((function(e){return e.data}))},b=function(e){return f.a.post(d,e).then((function(e){return e.data}))},p=function(e,n){return f.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return f.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},E=function(e){var n=e.message,t=e.errorMessage;return null===n?null:n?(console.log("confirmationMessage is: ",n),o.a.createElement("div",{className:"confirmationMessage"},n)):(console.log("error message is: ",t),o.a.createElement("div",{className:"error"},t))},g=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),s=Object(u.a)(c,2),f=s[0],d=s[1],g=Object(a.useState)(""),w=Object(u.a)(g,2),N=w[0],C=w[1],j=Object(a.useState)(""),O=Object(u.a)(j,2),k=O[0],y=O[1],T=Object(a.useState)(""),S=Object(u.a)(T,2),L=S[0],M=S[1],I=Object(a.useState)(""),P=Object(u.a)(I,2),D=P[0],F=P[1];Object(a.useEffect)((function(){h().then((function(e){r(e)})).catch((function(e){F("No data could be retreived from the server"),setTimeout((function(){F(null)}),5e3)}))}),[]),console.log("render",t.length,"persons");return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(E,{message:L,errorMessage:D}),o.a.createElement(l,{filterName:k,setFilterName:y}),o.a.createElement("h2",null,"add a new"),o.a.createElement(i,{addName:function(e){e.preventDefault();var n={name:f,number:N};if(!f||""===f)return alert("Enter a name");if(!N||""===N)return alert("Enter a number. A name without a number can not be added to the phonebook!");var a=t.find((function(e){return e.name.toLowerCase()===f.toLowerCase()}));a&&a.number!==N&&window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))?(a.number=N,p(a.id,a).then((function(e){console.log("response is:",e),r(t.map((function(n){return n.personName!==a?n:e.data}))),d(""),C(""),M("The old number for '".concat(a.name,"' is successfully replaced with the new number")),setTimeout((function(){M(null)}),5e3)})).catch((function(e){F("Information of '".concat(a.name,"' has already been removed from server")),setTimeout((function(){F(null)}),5e3),r(t.filter((function(e){return e.personName!==a})))}))):t.find((function(e){return e.name.toLowerCase()===f.toLowerCase()}))?alert("".concat(f," is already added to phonebook")):b(n).then((function(e){r(t.concat(e)),d(""),C(""),M("".concat(f," with the number ").concat(N," is successfully added to the phonebook")),setTimeout((function(){M(null)}),5e3)})).catch((function(e){console.log(e.response.data),F("".concat(e.response.data.error)),setTimeout((function(){F(null)}),5e3)}))},newName:f,newNumber:N,handleNameChange:function(e){d(e.target.value)},handleNumberChange:function(e){C(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement("div",null,o.a.createElement(m,{persons:t,filterName:k,removePerson:function(e){window.confirm("Delete ".concat(e.name," with the id number ").concat(e.id,"?"))&&v(e.id).then((function(){r(t.filter((function(n){return n.id!==e.id}))),M("".concat(e.name," is successfully removed from the phonebook")),setTimeout((function(){M(null)}),5e3)})).catch((function(n){F("Information of '".concat(e.name,"' has already been removed from server")),setTimeout((function(){F(null)}),5e3),h().then((function(e){r(e)}))}))}})))};t(36);c.a.render(o.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.16c9c673.chunk.js.map