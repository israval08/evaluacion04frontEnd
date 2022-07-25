import React, { Fragment, useState, useRef, useEffect } from 'react'
import { v1 as uuid } from 'uuid';
import { Item } from './Componente1';
export function Post(){
    const [posts, setPosts] = useState([]);
    const descripcionPost = useRef();const tituloPost = useRef();
    useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem(KEY));
    if (storedPosts){ setPosts(storedPosts);}}, [])
    useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(posts));}, [posts])
    const agregarPost = () => {
        const descripcion = document.getElementById('descripcion').value
        const titulo = document.getElementById('titulo').value
        const importante = document.getElementById('importante').checked
        if ((descripcion === '') && (titulo === '')) return;
        setPosts((prevPosts) => {
            const newPost = {
                id: uuid(),
                titulo: titulo,
                descripcion: descripcion,
                importante: importante
            } 
            return [...prevPosts, newPost]})
        descripcionPost.current.value = null
        tituloPost.current.value = null}
    const eliminarPost = (id) => {
        const newPosts = [...posts];
        const post = newPosts.find((post) => post.id === id)
        var index = newPosts.indexOf(post)
        if(index > -1){
            newPosts.splice(index, 1)
        }
        setPosts(newPosts);}
   const [isChecked, setIsChecked] = useState(true);
    return (
        <Fragment>
            <div className='elemento'>
                <div className='row align-items-center'>
                    <div className="col-auto">
                        <label htmlFor="titulo" className=""></label>
                        <input ref={tituloPost} type="text" className="form-label" placeholder='Titulo' id="titulo"></input>
                    </div>
                       <div className="col-auto">
                           <label htmlFor="descripcion" className="form-label"></label>
                           <input ref={descripcionPost} type="text" className="form-label" placeholder='Descripcion' id="descripcion"></input>
                       </div>
                       <div className="form-check col-auto form-label">
                           <input className="form-check-input" type="checkbox" value="" id="importante"
                               onChange={(event) => setIsChecked(event.currentTarget.checked)}
                               onClick={() => setIsChecked(!isChecked)}
                               checked={isChecked}
                               ></input>
                           <label className="form-check-label " htmlFor="importante">
                               Importante?
                           </label>
                       </div>
                        <div className="col-auto form-label"><button onClick={agregarPost} className="btn-md btn-dark form-control ">AGREGAR</button>
                    </div>
                </div>
            </div>
            <div className='row mt-5'>
                    <ul className='justify-content-center'>
                    {posts.map((post) => (
                        <Item post={post} key={post.id} eliminarPost={eliminarPost}></Item>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
}
const KEY = "postlist"
   

