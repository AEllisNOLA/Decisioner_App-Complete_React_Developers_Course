import React from 'react'

import AddOption from './AddOption'
import Header from './Header'
import Action from './Action'
import Options from './Options'

class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)

        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)

        this.state = {
            options: []
        }
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)

            if (options) {
                this.setState(() => ({ options }))
            }
        } catch (error) {
            // do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }

    }


    handleAddOption(option) {
        if (!option) {
            return 'Error: Enter valid value to add item.'
        } else if (
            this.state.options.indexOf(option) > -1) {
            return 'Error: This option already exists'
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option) }))
    }

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }))
    }

    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randomNum]
        alert(option)
    }
    handleDeleteOption(optionToRemove) {

        this.setState((prevState) => {
            return {
                options: prevState.options.filter((option) => {
                    return optionToRemove !== option
                })
            }

        })
    }

    render() {
        const subtitle = 'For When Decisions are Hard!'

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    handlePick={this.handlePick}
                    hasOptions={this.state.options.length > 0}
                />
                <Options
                    handleDeleteOptions={this.handleDeleteOptions}
                    options={this.state.options}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        )
    }
}

export default IndecisionApp;