import React from 'react';
import Card from 'react-credit-cards';
import { Link, withRouter } from 'react-router-dom';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
} from './utils';
import 'react-credit-cards/es/styles-compiled.css';

class CreditCard extends React.Component {
    state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: null,
    };

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name,
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { issuer } = this.state;
        const formData = [...e.target.elements]
            .filter((d) => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        this.setState({ formData });
        this.form.reset();
        this.props.checkout();
        this.props.history.push('/finished');
    };

    render() {
        const { name, number, expiry, cvc, focused, issuer, formData } =
            this.state;

        return (
            <div key="Payment">
                <div>
                    <div className="mb-8">
                        <Card
                            number={number}
                            name={name}
                            expiry={expiry}
                            cvc={cvc}
                            focused={focused}
                            callback={this.handleCallback}
                        />
                    </div>
                    <form
                        ref={(c) => (this.form = c)}
                        onSubmit={this.handleSubmit}
                    >
                        <div className="flex sm:mb-8 mb-4">
                            <label className="w-24">信用卡號碼</label>
                            <input
                                type="tel"
                                name="number"
                                className="input-style flex-1"
                                pattern="[\d| ]{16,22}"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                                placeholder="55..   44..   33..   11.."
                            />
                        </div>
                        <div className="flex sm:mb-8 mb-4">
                            <label className="w-24">持卡人姓名</label>
                            <input
                                type="text"
                                name="name"
                                className="input-style flex-1"
                                placeholder="Adam Apple"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className="flex sm:flex-row flex-col mb-8">
                            <div className="flex flex-1 sm:mr-8 sm:mb-0 mb-4">
                                <label className="w-24">有效期限</label>
                                <input
                                    type="tel"
                                    name="expiry"
                                    className="input-style flex-1"
                                    placeholder="MM/YY"
                                    pattern="\d\d/\d\d"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            <div className="flex flex-1">
                                <label className="w-20">CVC</label>
                                <input
                                    type="tel"
                                    name="cvc"
                                    className="input-style flex-1"
                                    placeholder="111"
                                    pattern="\d{3,4}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                        </div>
                        <input type="hidden" name="issuer" value={issuer} />
                        <div className="flex flex-row justify-center">
                            <button
                                type="button"
                                className=" btn-yellow-hollow flex flex-row justify-end items-center"
                                onClick={() => {
                                    this.props.history.push('/checkout');
                                }}
                            >
                                {/* <Link
                                    to="/checkout"
                                    className="btn-yellow-hollow flex flex-row justify-end items-center"
                                > */}
                                <p className="font-bold sm:text-xl text-lg">
                                    上一步
                                </p>
                                {/* </Link> */}
                            </button>
                            <button
                                type="submit"
                                className="ml-4 mb-1 btn-yellow flex flex-row justify-end items-center"
                            >
                                <p className="font-bold sm:text-xl text-lg">
                                    下一步
                                </p>
                            </button>
                        </div>
                    </form>
                    {formData && (
                        <div className="App-highlight">
                            {formatFormData(formData).map((d, i) => (
                                <div key={i}>{d}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default withRouter(CreditCard);
