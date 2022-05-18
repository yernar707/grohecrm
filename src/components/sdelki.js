import React from 'react'
import { StaticImage } from 'gatsby-plugin-image';
import { getUser } from "../services/auth";

class Sdelki extends React.Component {
    state = {
        showQuickAdd : false,
        addSdelka : false,
        sdelkaId: 0
    }
	render(){
		return(
            <div className='sdelki-page'>
                {( this.state.addSdelka || this.state.sdelkaId !== 0 ) && <div onClick={() => this.setState({ addSdelka : false })} className='dark-bg'></div>}
                <div className='default-header'>
                    <div className='default-container' style={{height: `100%`}}>
                        <div className='flex-row'>
                            <div className='col-2 flex-item page-title'>
                                Сделки
                            </div>
                            <div className='col-5 flex-item'>
                                <form>
                                    <i>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.4026 11.4026C11.7856 11.0196 12.4066 11.0196 12.7896 11.4026L16.7127 15.3257C17.0957 15.7087 17.0957 16.3297 16.7127 16.7127C16.3297 17.0958 15.7087 17.0958 15.3257 16.7127L11.4026 12.7897C11.0196 12.4067 11.0196 11.7857 11.4026 11.4026Z" fill="white"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.19231 1.96154C4.30343 1.96154 1.96154 4.30343 1.96154 7.19231C1.96154 10.0812 4.30343 12.4231 7.19231 12.4231C10.0812 12.4231 12.4231 10.0812 12.4231 7.19231C12.4231 4.30343 10.0812 1.96154 7.19231 1.96154ZM0 7.19231C0 3.22011 3.22011 0 7.19231 0C11.1645 0 14.3846 3.22011 14.3846 7.19231C14.3846 11.1645 11.1645 14.3846 7.19231 14.3846C3.22011 14.3846 0 11.1645 0 7.19231Z" fill="white"/>
                                        </svg>
                                    </i>
                                    <input type={'text'} name="search" id='search' placeholder='Поиск'></input>
                                </form>
                            </div>
                            <div className='col-5 flex-item flex-item-last'>
                                <p className='sdelki-quantity'>0 сделок: </p>
                                <p className='sdelki-money'>0 тенге</p>
                                <button className='three-dots'>•••</button>
                                <button className='settings-button'>НАСТРОЙКА</button>
                                <button onClick={() => this.setState({ addSdelka : true })} className='new-sdelka-button'>+ НОВАЯ СДЕЛКА</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='layout-div body-element default-content'>
                    <div className='default-container'>
                        <div className='flex-row'>
                            <div className='col-3 sdelki-column first-column'>
                                <div className='column-title'>
                                    первичный контакт
                                </div>
                                <div className='column-subtitle'>
                                    0 сделок: 0 тенге
                                </div>
                                <hr></hr>
                                <div className='sdelka'>
                                    <div className='card'>
                                        <div className='sdelka-title'>
                                            Текст
                                        </div>
                                        <div className='sdelka-company'>
                                            Компания: название
                                        </div>
                                        <div className='sdelka-price'>
                                            50000 тг
                                        </div>
                                        <div className='sdelka-show'>
                                            <span onClick={() => this.setState({ sdelkaId : 1 })}>Показать</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.sdelkaId !== 0 && <div className='sdelka-modal'>
                                        <span onClick={() => this.setState({ sdelkaId : 0 })} className='close-modal'>×</span>
                                        <div className='sdelka-modal-title'>
                                            Текст
                                        </div>
                                        <div className='sdelka-modal-content'>
                                            <div>
                                                <h5>Основной контакт</h5>
                                                <ul>
                                                    <li>Текст</li>
                                                    <li>Текст</li>
                                                    <li>Текст</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5>Компния контакта</h5>
                                                <ul>
                                                    <li>Текст</li>
                                                    <li>Текст</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5>Бюджет: 50000 тг</h5>
                                            </div>
                                            <div>
                                                <form>
                                                    <div>
                                                        <select className='default-input'>
                                                            <option value="first">ПЕРВИЧНЫЙ КОНТАКТ</option>
                                                            <option value="second">ПЕРЕГОВОРЫ</option>
                                                            <option value="third">ПРИНИМАЮТ РЕШЕНИЕ</option>
                                                            <option value="fourth">СОГЛАСОВАНИЕ ДОГОВОРА</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <input className='default-blue-button' type="submit" value="Сохранить" />
                                                        <input onClick={() => this.setState({sdelkaId:0})} className='default-white-button' type="reset" value="Отменить" />
                                                    </div>
                                                </form>
                                                
                                            </div>
                                        </div>
                                    </div>
                                }
                                {!this.state.showQuickAdd && <button onClick={() => this.setState({showQuickAdd:true})} className='quick-add'>Быстрое добавление</button>}
                                {this.state.showQuickAdd && <div>
                                        <form className='quick-add-form'>
                                            <div>
                                                <input name='sdelka-name' type='text' placeholder='Название'></input>
                                            </div>
                                            <div>
                                                <input name='price' type='number' placeholder='0 тг'></input>
                                            </div>
                                            <div>
                                                <input name='contact-name' type='text' placeholder='Контакт: имя'></input>
                                            </div>
                                            <div>
                                                <input name='contact-phone' type='phone' placeholder='Контакт: телефон'></input>
                                            </div>
                                            <div>
                                                <input name='contact-email' type='mail' placeholder='Контакт: E-mail'></input>
                                            </div>
                                            <div>
                                                <input name='company-name' type='text' placeholder='Компания: название'></input>
                                            </div>
                                            <div>
                                                <input name='company-address' type='text' placeholder='Компания: адрес'></input>
                                            </div>
                                            <div className='flex-row'>
                                                <div className='col-5'>
                                                    <input className='submit-button' type='submit' onClick={() => this.setState({showQuickAdd:false})} value="Добавить"></input>
                                                </div>
                                                <div className='col-5'>
                                                    <input type='reset' className='cancel-button'  onClick={() => this.setState({showQuickAdd:false})} value={"Отменить"}></input>
                                                </div>
                                            </div>                                            
                                        </form>
                                    </div>
                                }
                            </div>
                            <div className='col-3 sdelki-column second-column'>
                                <div className='column-title'>
                                    переговоры
                                </div>
                                <div className='column-subtitle'>
                                    0 сделок: 0 тенге
                                </div>
                                <hr></hr>
                            </div>
                            <div className='col-3 sdelki-column third-column'>
                                <div className='column-title'>
                                    Принимают решение
                                </div>
                                <div className='column-subtitle'>
                                    0 сделок: 0 тенге
                                </div>
                                <hr></hr>
                            </div>
                            <div className='col-3 sdelki-column fourth-column'>
                                <div className='column-title'>
                                    согласование договора
                                </div>
                                <div className='column-subtitle'>
                                    0 сделок: 0 тенге
                                </div>
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.addSdelka && <div className='new-good-modal'>
                            <span onClick={() => this.setState({ addSdelka : false })} className='close-modal'>×</span>
                            <div className='new-good-modal-title'>
                                <p>Новая сделка</p>
                            </div>
                            <div className='new-good-modal-content'>
                                <form>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Название"/>
                                    </div>
                                    <div>
                                        <input className='default-input' type="number" placeholder="0 тг"/>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Контакт: имя"/>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Контакт: телефон"/>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Контакт: E-mail"/>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Компания: название"/>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Компания: адрес"/>
                                    </div>
                                    <div className='new-good-buttons'>
                                        <input className='default-blue-button' type="submit" value="Добавить" />
                                        <input className='default-white-button' type="reset" onClick={() => this.setState({ addSdelka : false })} value="Отмена" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
            
        )
    }

}

export default Sdelki