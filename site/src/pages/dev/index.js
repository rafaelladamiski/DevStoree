import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'

import { Container, Conteudo } from './styled'

import { useState, useEffect, React, useRef } from 'react'

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

import Api from '../service/api.js'
const api = new Api();

export default function Index () {
    const [produto, setProduto] = useState([]);
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [precoDe, setPrecoDe] = useState('');
    const [precoPor, setPrecoPor] = useState('');
    const [estoque, setEstoque] = useState('');
    const [imagem, setImagem] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idAlterando, setIdAlterando] = useState(0)
    const loading = useRef();

    async function listar () {

        loading.current.continuousStart();
        let r = await api.listar();
        setProduto(r);
        loading.current.complete();

    }

    useEffect(() => { 
        listar();
    },
     [])

     async function inserir () {
        loading.current.continuousStart();
        if(nome === (''))
            toast.dark('Nome inválido');
    if (categoria === (''))
        toast.dark('Categoria inválida');
    if (avaliacao === (isNaN) || avaliacao ===('') || avaliacao < 0)
         toast.dark('Avaliacao inválida');
    if (precoDe === ('') || precoDe === (isNaN) || precoDe < 0) 
         toast.dark('Preço de inválido');
    if (precoPor === ('') || precoPor === (isNaN) || precoPor < 0)
         toast.dark('Preço por inválido');
    if (estoque === ('') || estoque === (isNaN) || estoque < 0)
         toast.dark('Estoque invalido');  
    if (imagem === (''))
         toast.dark('Imagem inválida');
    if (descricao === (''))
         toast.dark('Descrição inválida')
        if(idAlterando === 0){
            let r = await api.inserir(nome, categoria, precoDe, precoPor, avaliacao, descricao, estoque, imagem);
            if(r.erro)
                toast.dark(r.erro)
            else {
                toast.dark('Produto inserido!')
                limparCampos();
            }
            
        } else {
            let r = await api.alterar( idAlterando, nome, categoria, precoDe, precoPor, avaliacao, descricao, estoque, imagem);
            if (r.erro)
            toast.dark(r.erro)
            else
                toast.dark('Produto alterado!')
                limparCampos();
                listar();
        }
        listar();
        loading.current.complete()
    }

    function limparCampos () {
        setNome('')
        setCategoria('')
        setPrecoDe('')
        setPrecoPor('')
        setAvaliacao('')
        setDescricao('')
        setEstoque('')
        setImagem('')

        setIdAlterando(0);
    }
    async function remover (id) {
        loading.current.continuousStart();

        confirmAlert({
            title: 'Remover Produto',
            message: `Tem certeza que deseja remover o produto ${id}?`,
            buttons: [
                {
                    label: 'Sim, remover',
                    onClick: async() => {
                        let r = await api.remover(id)
                        if(r.erro) {
                            toast.dark(r.erro)
                        } else {
                            toast.dark('Produto removido!')
                        }
                        listar();
                    }
                },
                {
                    label: 'Não, cancelar'}
            ]
        })
        listar();

        loading.current.complete()
    }

    async function editar (item) {
        setNome(item.nm_produto);
        setCategoria(item.ds_categoria);
        setPrecoDe(item.vl_preco_de);
        setPrecoPor(item.vl_preco_por);
        setAvaliacao(item.vl_avaliacao);
        setDescricao(item.ds_produto);
        setEstoque(item.qtd_estoque);
        setImagem(item.img_produto);
        setIdAlterando(item.id_produto);
    }

    return (
        <Container>
            <ToastContainer/>
            <LoadingBar color="#10EAEA" ref={loading} />
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div class="body-right-box">
                    <div class="new-student-box">
                        
                        <div class="text-new-student">
                            <div class="bar-new-student"></div>
                            <div class="text-new-student">{idAlterando === 0 ? "Novo produto" : "Alterando produto " + idAlterando}</div>
                        </div>

                        <div class="input-new-student"> 
                            <div class="input-left">
                                <div class="agp-input"> 
                                    <div class="name-student"> Nome: </div>  
                                    <div class="input"> <input type="text" value={nome} onChange={e => setNome(e.target.value)}/> </div>  
                                </div> 
                                <div class="agp-input">
                                    <div class="number-student"> Categoria: </div>  
                                    <div class="input"> <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)}/> </div> 
                                </div>

                                <div class="agp-input">
                                    <div class="number-student"> Avaliação: </div>  
                                    <div class="input"> <input type="text" value={avaliacao} onChange={e => setAvaliacao(e.target.value)}/> </div> 
                                </div>
                            </div>

                            <div class="input-right">
                                <div class="agp-input">
                                    <div class="corse-student"> Preço De: </div>  
                                    <div class="input"> <input type="text" value={precoDe} onChange={e => setPrecoDe(e.target.value)} /> </div>  
                                </div>
                                <div class="agp-input">
                                    <div class="class-student"> Preço POR: </div>  
                                    <div class="input"> <input type="text" value={precoPor} onChange={e => setPrecoPor(e.target.value)}/> </div> 
                                </div>

                                <div class="agp-input">
                                    <div class="class-student"> Estoque: </div>  
                                    <div class="input"> <input type="text" value={estoque} onChange={e => setEstoque(e.target.value)}/> </div>
                                </div>

                            </div>

                        </div>

                        <div class="input-new-student-2">
                        <div class="agp-input-2">
                                    <div class="number-student"> Link Imagem: </div>  
                                    <div class="input"> <input type="text" value={imagem} onChange={e => setImagem(e.target.value)} /> </div> 
                                </div>

                                <div class="agp-textarea">
                                    <div class="number-student"> Descrição: </div>  
                                    <div class="input"> <textarea type="text" value={descricao} onChange={e => setDescricao(e.target.value)}/> </div> 
                                </div>
                            
                        </div>
                        <div class="button-create"> <button onClick={inserir}> {idAlterando === 0 ? "Cadastrar": "Alterar"} </button> </div>

                    </div>

                    <div class="student-registered-box">
                        <div class="row-bar"> 
                            <div class="bar-new-student"> </div>
                            <div class="text-registered-student"> Produtos Cadastrados </div>
                        </div>
                    
                        <table class ="table-user">
                            <thead>
                                <tr>
                                    <th> </th>
                                    <th> ID </th>
                                    <th> Produto </th>
                                    <th> Categoria </th>
                                    <th> Preço </th>
                                    <th> Estoque </th>
                                    <th class="coluna-acao"> </th>
                                    <th class="coluna-acao"> </th>
                                </tr>
                            </thead>
                    
                            <tbody>
                            
                            {produto.map((item, i) =>
                                
                                <tr className={i % 2 === 0 ? "linha-alternada": ""}>
                                    <td> <img src={item.img_produto} alt='' width='50px' height='50px' /></td>
                                    <td> {item.id_produto} </td>
                                    <td title={item.nm_produto}> {item.nm_produto != null && item.nm_produto.length >= 25 ? item.nm_produto.substr(0, 25) + '...' : item.nm_produto}</td>
                                    <td> {item.ds_categoria} </td>
                                    <td> {item.vl_preco_de} </td>
                                    <td> {item.qtd_estoque} </td>
                                    <td className="coluna-acao"> <button onClick={ () => editar(item)}> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                    <td className="coluna-acao"> <button onClick={ () => remover(item.id_produto) }> <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                                </tr>

                            )}
                                
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}