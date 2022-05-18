import React from 'react'
import { getUser } from "../services/auth";

class Sklady extends React.Component {

    state = {
        selectAll : false,
        checkBoxes : [],
        changeSkladmen : false,
        addGood : false,
        addSklad : false,
        filterStr : "",
        currentSklad : [],
        filterGoods : "",
    }

    sklady = [
        {
            id : 1,
            name : "Склад №1",
            address : "УЛ. БАЙЗАКОВА 267А",
            manager : "Manager 1"
        }, 
        {
            id : 2,
            name : "Склад №2",
            address : "УЛ. БАЙЗАКОВА 20А",
            manager : "Manager 2"
        }, 
        {
            id : 3,
            name : "Склад №3",
            address : "УЛ. БАЙЗАКОВА 300А",
            manager : "Manager 3"
        }, 
    ]

    goods = [
        {
            id : 1,
            skladId : 1,
            article : "a020a202a",
            name : "Tayap",
            parameter : "for bath",
            parameter2 : "metal" 
        },
        {
            id : 2,
            skladId : 2,
            article : "b020a202a",
            name : "Tayap",
            parameter : "for bath",
            parameter2 : "metal" 
        },
        {
            id : 3,
            skladId : 3,
            article : "c020a202a",
            name : "Tayap",
            parameter : "for bath",
            parameter2 : "metal" 
        },
        {
            id : 4,
            skladId : 1,
            article : "d020a202a",
            name : "Tayap 2",
            parameter : "for bath",
            parameter2 : "metal" 
        },
        {
            id : 5,
            skladId : 1,
            article : "e020a202a",
            name : "Tayap 3",
            parameter : "for bath",
            parameter2 : "metal" 
        },
    ]

    checkState() {
        this.setState({ selectAll : true })
        this.state.checkBoxes.forEach( checkBox => {
            if(checkBox === false)
                this.setState({ selectAll : false })
        })
    }

    getStatus(elem) {
        var temp = this.state.checkBoxes
        temp[elem.currentTarget.id] = !this.state.checkBoxes[elem.currentTarget.id]
        this.setState({ checkBoxes : temp })
        elem.currentTarget.checked = this.state.checkBoxes[elem.currentTarget.id]
        this.checkState()
    }

    checkAll() {
        if(this.state.selectAll === false){
            this.setState({ selectAll : true })
            let temp = new Array(this.state.checkBoxes.length).fill(true)
            this.setState({ checkBoxes : temp })
        } else {
            this.setState({ selectAll : false })
            let temp = new Array(this.state.checkBoxes.length).fill(false)
            this.setState({ checkBoxes : temp })
        }
    }

    setCheckBoxes() {
        let len = 0
        if(this.state.currentSklad.length > 0)
            len = this.goods.filter(s => s.skladId === this.state.currentSklad[0].id).length
        let temp = new Array(len).fill(false)
        this.setState({ checkBoxes : temp })
    }

	render(){
        const filterStr = this.state.filterStr;
        const filteredSklady = this.sklady
            .filter(s => s.name.toLowerCase().includes(filterStr.toLowerCase()))
            .map(s => <div key={s.id} className='col-3 sklad-column'>
                    <div className='card'>
                        <div className='sklad-title'>
                            {s.name}
                        </div>
                        <div className='sklad-content'>
                             <p className='sklad-address'>
                                {s.address}
                             </p>
                             <p className='sklad-info'>
                                {this.goods.filter(g => g.skladId === s.id).length} элементов
                             </p>
                             <button onClick={() => {this.setState({ checkBoxes : [], currentSklad : this.sklady.filter(sklad => sklad.id === s.id) }, () => {this.setCheckBoxes()})}} className='sklad-show-button'>Показать</button>
                        </div>
                    </div>
                </div>
            )
        const filterGoods = this.state.filterGoods;
        var filteredGoods = this.goods
        if(this.state.currentSklad.length > 0){
            filteredGoods = this.goods
                .filter(g => g.skladId === this.state.currentSklad[0].id)
                .filter(g => g.name.toLowerCase().includes(filterGoods.toLowerCase()) || g.article.toLowerCase().includes(filterGoods.toLowerCase()))
                .map((g, index) => <tr key={g.article}>
                        <td>
                            <label className="container-check">
                                <input id={index} onChange={(e) => this.getStatus(e)} checked={this.state.checkBoxes[index]} type="checkbox"></input>
                                <span className="checkmark"></span>
                            </label>
                        </td>
                        <td>
                            {g.article}
                        </td>
                        <td>
                            {g.name}
                        </td>
                        <td>
                            {g.parameter}
                        </td>
                        <td>
                            {g.parameter}
                        </td>
                        <td>
                            {g.parameter2}
                        </td>
                    </tr>
                )
        }
		return(
            <div className='sklad-page'>
                {( this.state.currentSklad.length !== 0 || this.state.addGood || this.state.addSklad ) && <div role="button" onClick={() => {this.setState({ changeSkladmen : false, addGood : false, addSklad : false, currentSklad : [], selectAll : false })}} onKeyDown={() => {this.setState({ changeSkladmen : false, addGood : false, addSklad : false, currentSklad : [], selectAll : false })}} className='dark-bg'></div>}
                <div className='default-header'>
                    <div className='default-container' style={{height: `100%`}}>
                        <div className='flex-row'>
                            <div className='col-2 flex-item page-title'>
                                Склады
                            </div>
                            <div className='col-5 flex-item'>
                                <form>
                                    <i>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.4026 11.4026C11.7856 11.0196 12.4066 11.0196 12.7896 11.4026L16.7127 15.3257C17.0957 15.7087 17.0957 16.3297 16.7127 16.7127C16.3297 17.0958 15.7087 17.0958 15.3257 16.7127L11.4026 12.7897C11.0196 12.4067 11.0196 11.7857 11.4026 11.4026Z" fill="white"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.19231 1.96154C4.30343 1.96154 1.96154 4.30343 1.96154 7.19231C1.96154 10.0812 4.30343 12.4231 7.19231 12.4231C10.0812 12.4231 12.4231 10.0812 12.4231 7.19231C12.4231 4.30343 10.0812 1.96154 7.19231 1.96154ZM0 7.19231C0 3.22011 3.22011 0 7.19231 0C11.1645 0 14.3846 3.22011 14.3846 7.19231C14.3846 11.1645 11.1645 14.3846 7.19231 14.3846C3.22011 14.3846 0 11.1645 0 7.19231Z" fill="white"/>
                                        </svg>
                                    </i>
                                    <input type={'text'} onChange={e => this.setState({ filterStr: e.target.value })} name="search" id='search' placeholder='Поиск'></input>
                                </form>
                            </div>
                            <div className='col-5 flex-item flex-item-last'>
                                <p className='sklady-quantity'>{this.goods.length} элементов</p>
                                <button className='three-dots'>•••</button>
                                { getUser().role === "admin" && <button onClick={() => this.setState({ addSklad : true })} className='new-sklad-button'>+ ДОБАВИТЬ СКЛАД</button>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='layout-div body-element default-content'>
                    <div className='add-good'>
                        <button className='default-blue-button' onClick={() => this.setState({ addGood : true })}>+ ДОБАВИТЬ ТОВАР</button>
                    </div>
                    <div className='default-container'>
                        <div className='flex-row'>
                            {filteredSklady}
                        </div>
                    </div>
                    {
                        this.state.addSklad && <div className='new-good-modal'>
                            <span onClick={() => this.setState({ addSklad : false })} className='close-modal'>×</span>
                            <div className='new-good-modal-title'>
                                <p>Добавить склад</p>
                            </div>
                            <div className='new-good-modal-content'>
                                <form>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Название"/>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Адрес"/>
                                    </div>
                                    <div>
                                        <select className='default-input'>
                                            <option value="Skladmen 1">
                                                Складмен 1
                                            </option>
                                            <option value="Skladmen 2">
                                                Складмен 2
                                            </option>
                                            <option value="Skladmen 3">
                                                Складмен 3
                                            </option>
                                            <option value="Skladmen 4">
                                                Складмен 4
                                            </option>
                                        </select>
                                    </div>
                                    <div className='new-good-buttons'>
                                        <input className='default-blue-button' type="submit" value="Добавить" />
                                        <input className='default-white-button' type="reset" onClick={() => this.setState({ addSklad : false })} value="Отмена" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    }

                    {
                        this.state.addGood && <div className='new-good-modal'>
                            <span onClick={() => this.setState({ addGood : false })} className='close-modal'>×</span>
                            <div className='new-good-modal-title'>
                                <p>Добавить товар</p>
                            </div>
                            <div className='new-good-modal-content'>
                                <form>
                                    <div>
                                        <select className='default-input'>
                                            {
                                                this.sklady.map(s => <option key={s.id} value={s.id}>
                                                    {s.name}
                                                </option>)
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Артикуль"/>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Название"/>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Параметры"/>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Параметры"/>
                                    </div>
                                    <div className='new-good-buttons'>
                                        <input className='default-blue-button' type="submit" value="Добавить" />
                                        <input className='default-white-button' type="reset" onClick={() => this.setState({ addGood : false })} value="Отмена" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                    {this.state.currentSklad.length !== 0 &&<div className='sklad-modal'>
                        <span onClick={() => {this.setState({ currentSklad : [], changeSkladmen : false, selectAll : false })}} className='close-modal'>×</span>
                        <div className='sklad-modal-title'>
                            {this.state.currentSklad[0].name }
                        </div>
                        <div className='sklad-modal-content'>
                            <p className='skladmen-name'>
                                {this.state.currentSklad[0].manager } { getUser().role === "admin" && !this.state.changeSkladmen && <button onClick={() => this.setState({ changeSkladmen : true })} className='default-blue-button'>Изменить</button> } 
                            </p>
                            { this.state.changeSkladmen && <form style={{
                                width: 350, margin: "auto", padding: 25
                            }}>
                                <select style={{border: "1px solid #333"}} className='default-input'>
                                    <option value="Skladmen 1">
                                        Складмен 1
                                    </option>
                                    <option value="Skladmen 2">
                                        Складмен 2
                                    </option>
                                    <option value="Skladmen 3">
                                        Складмен 3
                                    </option>
                                    <option value="Skladmen 4">
                                        Складмен 4
                                    </option>
                                </select>
                                <div className='row' style={{marginTop: 25}}>
                                    <div className='col-6'>
                                        <input className='default-blue-button' type="submit" value="Сохранить" />
                                    </div>
                                    <div className='col-6'>
                                        <input className='default-white-button' onClick={() => this.setState({ changeSkladmen : false })} type="reset" value="Отменить" />
                                    </div>
                                </div>
                            </form>}
                            <div className='sklad-modal-search'>
                                <form>
                                    <div>
                                        <i>
                                            <svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.4026 11.4026C11.7856 11.0196 12.4066 11.0196 12.7896 11.4026L16.7127 15.3257C17.0957 15.7087 17.0957 16.3297 16.7127 16.7127C16.3297 17.0958 15.7087 17.0958 15.3257 16.7127L11.4026 12.7897C11.0196 12.4067 11.0196 11.7857 11.4026 11.4026Z" fill="white"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.19231 1.96154C4.30343 1.96154 1.96154 4.30343 1.96154 7.19231C1.96154 10.0812 4.30343 12.4231 7.19231 12.4231C10.0812 12.4231 12.4231 10.0812 12.4231 7.19231C12.4231 4.30343 10.0812 1.96154 7.19231 1.96154ZM0 7.19231C0 3.22011 3.22011 0 7.19231 0C11.1645 0 14.3846 3.22011 14.3846 7.19231C14.3846 11.1645 11.1645 14.3846 7.19231 14.3846C3.22011 14.3846 0 11.1645 0 7.19231Z" fill="white"/>
                                            </svg>
                                        </i>
                                        <input className='default-input grey-bg' onChange={e => this.setState({ filterGoods: e.target.value })} placeholder='Поиск' type="text" />
                                    </div>
                                </form>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>
                                            <label className="container-check">
                                                <input onChange={() => this.checkAll()} checked={this.state.selectAll} type="checkbox"></input>
                                                <span className="checkmark"></span>
                                            </label>
                                        </th>
                                        <th>Артикуль</th>
                                        <th>название</th>
                                        <th>параметры</th>
                                        <th>параметры</th>
                                        <th>параметры</th>
                                    </tr>
                                    { filteredGoods }
                                </tbody>
                            </table>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }

}

export default Sklady