
import { useEffect, useState } from 'react'
import logo2 from '../../assets/logo2.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import pro2 from '../../assets/pro2.jpeg'
import Membernav from './membernav'

function Memberhome() {
  const [pro ,setPro]=useState([])
      const [hover,setHover] = useState(false);
      const navigate=useNavigate()
  
  const id=localStorage.getItem('id')
  useEffect(()=>{
    const  projectdetails=async ()=>{
      try{
       const response=await axios.get(`http://localhost:3000/viewmembertask/${id}`)
        setPro(response.data)
        console.log(response.data);
        
      }
      catch(error){console.error(error);
      }
    }
    projectdetails()
  },[])
  return (
    <div className='overflow-x-hidden '>
     <header> <div className=' w-full absolute top-0 h-[48%]'>
        <img src={logo2} alt="Admin" className={`w-full h-full object-cover`} />
        <div className='flex justify-end sm:justify-center'><h1 className='   transform -translate-y-7/3 lg:-translate-y-7/4 lg:text-4xl  sm:translate-x-30 text-white   font-bold text-xl sm:text-3xl  '><span className='text-xl font-light'> New way to <br /> </span> manage your projects</h1></div>


      </div>
      
      <div className='flex  flex-col max-sm:flex-row  items-center bg-[rgba(57,57,57,0.22)] text-white w-full gap-6'>
        
        <div className='navclass '>
        <Membernav/></div>
          
       
                 

      
    </div>
    <p className='text-5xl text-amber-800 h-[48vh] bg-red-300'>  .</p></header>
    <div className='flex flex-col gap-4 mx-5 sm:mx-14   overflow-hidden rounded-2xl'>
   <div className='my-5 bg-blue-100 w-full rounded-lg'> <h1 className='text-3xl sm:text-5xl font-black text-black font-[Poppins,sans-serif] translate-x-5 '> 
    Member Tasks</h1>

{/* 
      <div className="sm:col-span-7 grid grid-cols-2 gap-5 m-4 w-full p-4">
   <img src={pro2} alt="" className='w-full '/>
    <p className="text-sm sm:text-base text-gray-800">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
      reprehenderit placeat eos optio fugiat ullam ratione voluptatibus ut
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut beatae vero minima debitis explicabo deserunt, modi vitae non labore quasi vel dolorem praesentium, ea nobis autem aperiam saepe velit voluptas.
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non inventore quo culpa, impedit natus accusantium sint corporis ipsam quae tenetur nostrum enim neque? Recusandae similique hic voluptates ipsa excepturi corporis mollitia repudiandae, repellat laboriosam placeat, ex dignissimos fugit porro tempore pariatur, illum rerum provident ad sed! Nostrum nihil sit quam unde debitis possimus deleniti repellat modi sed, voluptatum illum ullam, cupiditate voluptates dolores. Mollitia eaque molestiae tempore reiciendis veritatis distinctio, ea id, doloremque enim minus qui omnis, odio illum. Odit possimus reprehenderit eaque dicta nostrum impedit sint, quibusdam accusantium iusto ipsum dolorem, deleniti ea delectus fuga obcaecati! Perferendis, consequatur iusto.
    </p>
   
  </div> */}

  <div className="sm:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5 m-4  p-4 bg-gradient-to-tl from-gray-300 to-gray-500 rounded-lg">
  <img src={pro2} alt="" className="w-full h rounded-xl object-cover h-full" />

  <p className="text-sm sm:text-base text-gray-800 leading-relaxed h-96 overflow-scroll scrollbar-hide p-2">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
    reprehenderit placeat eos optio fugiat ullam ratione voluptatibus ut
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut beatae vero minima debitis explicabo deserunt, modi vitae non labore quasi vel dolorem praesentium, ea nobis autem aperiam saepe velit voluptas.
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non inventore quo culpa, impe Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea soluta repudiandae recusandae veniam nulla provident autem neque aliquam reprehenderit iusto illum vel totam quos maxime culpa, quibusdam labore saepe magni quisquam molestias tempore harum placeat impedit tempora. Sequi, culpa consequuntur, veniam beatae eius, in fuga repellendus exercitationem sit quidem at.dit natus accusantium sint corporis ipsam quae tenetur nostrum enim neque? Recusandae similique hic voluptates ipsa excepturi corporis mollitia repudiandae, repellat laboriosam placeat, ex dignissimos fugit porro tempore pariatur, illum rerum provident ad sed! Nostrum nihil sit quam unde debitis possimus deleniti repellat modi sed, voluptatum illum ullam, cupiditate voluptates dolores. Mollitia eaque molestiae tempore reiciendis veritatis distinctio, ea id, doloremque enim minus qui omnis, odio illum. Odit possimus reprehenderit eaque dicta nostrum impedit sint, quibusdam accusantium iusto ipsum dolorem, deleniti ea delectus fuga obcaecati! Perferendis, consequatur iusto.
  </p>
</div>



       <div className={`overflow-x-auto ring-1  ${hover ? '' :'scrollbar-hide' } ring-slate-700/5 rounded-2xl shadow-2xl p-5  px-1 pb-8  mt-2`} onMouseEnter={ () => setHover(true)} onMouseLeave={() => setHover(false)}>

    <div className='flex min-w-max '>
      {pro.map((r,i)=>(
      <div className='card h-50 w-[20.5rem] m-3 rounded-2xl p-3 bg-linear-to-br from-sky-300 to-indigo-500 overflow-y-scroll scrollbar-hide flex flex-col gap-3'key={i}>
        <p>{r.task}</p>
        <div className='h-27 overflow-scroll scrollbar-hide'><p>{r.TaskDescription}</p>
</div>
        <button className='btn1 self-end' onClick={() => { navigate(`/member/memberhome/memtask/task/${r.project}/${id}`) }}>view details</button>
      </div>))}
    </div></div></div>



   
</div> 

<footer>
  <div className='w-full h-[20vh] bg-black'>

  </div>
</footer>


    </div>
  )
}

export default Memberhome
