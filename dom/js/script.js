// const btnX = document.querySelectorAll('.btn-x')

// btnX.forEach(btn => {
//   btn.addEventListener('click', function(e){
//     e.target.parentElement.style.display = 'none'
//   })
// });

const container = document.querySelector('.container')

container.addEventListener('click', e => {
  if(e.target.className == 'btn-x'){
    e.target.parentElement.style.display = 'none'
  }
})