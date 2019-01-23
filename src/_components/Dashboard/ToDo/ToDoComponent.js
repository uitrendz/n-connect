import React from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import ToDoItem from './ToDoItem';
import * as todoActions from '../../../actions/todoActions';
import { ManageToDo } from './ManageToDo';
import NoResults from '../../_common/NoResults';

class ToDoComponent extends React.Component {

    state = {
        addEditActive: false,
        selectedToDelete: false,
        todoId: '',
        filterType: null
    };

    componentDidMount() {
        //this.props.dispatch(userActions.getAll());
    }

    addEditToDo = (todoId) => {
        this.setState({ addEditActive: true, selectedId: todoId ? todoId : null });
    }

    hideEditing = () => {
        this.setState({ addEditActive: false });
    }

    deleteToDo = (todoId) => {
        this.props.actions.deleteToDo(todoId)
            .then(() => { toastr.success('Deleted ToDo successfully'); })
            .catch(error => {
                toastr.error(error);
                this.setState({ saving: false });
                this.setState({ selectedToDelete: false, selectedId: null });
            });
    }

    onUpdate = (todo) => {
        let model = todo;
        model.updatedOn = new Date();
        model.userId = this.props.user._id;
        model.active = todo.active ? false : true;
        this.props.actions.updateToDo(model)
            .then(() => {
                toastr.success('ToDo saved');
            })
            .catch(error => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    filterNotes = (type) => {
        this.setState({ filterType: type });
    }

    render() {
        let todolist = this.props.todolist.filter(todo => todo.active !== this.state.filterType);

        return (
            <div className={"card rounded " + (this.state.addEditActive ? 'todo-edit-active' : '')}>
                <h2 className="mb-0 custom-font font-weight-light display-5 px-5 pt-4">TO-DO</h2>
                <div className="top-header tabs border-bottom px-5">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className={'nav-link cursor-pointer ' + (this.state.filterType == null ? 'active' : '')} onClick={() => this.filterNotes(null)}><small>ALL</small></a>
                        </li>
                        <li className="nav-item">
                            <a className={'nav-link cursor-pointer ' + (this.state.filterType == false ? 'active' : '')} onClick={() => this.filterNotes(false)}><small>ACTIVE</small></a>
                        </li>
                        <li className="nav-item">
                            <a className={'nav-link cursor-pointer ' + (this.state.filterType == true ? 'active' : '')} onClick={() => this.filterNotes(true)}><small>DONE</small></a>
                        </li>
                    </ul>
                    <div className="floating-cntr center">
                        <span className="rounded-btn bg-secondary" onClick={this.addEditToDo}>
                            <i className="material-icons text-white mr-4">
                                add
                            </i>
                        </span>
                    </div>
                </div>
                <div className="scollable todo-widget pt-3">
                    {todolist.length === 0 ?
                        <NoResults />
                        :
                        todolist.map(todo =>
                            <ToDoItem
                                todo={todo}
                                key={todo._id}
                                onDelete={this.deleteToDo}
                                onUpdate={this.onUpdate}
                                onEdit={this.addEditToDo}
                            />
                        )}
                    <ManageToDo
                        selectedId={this.state.selectedId}
                        onHideEdit={this.hideEditing}
                    />
                </div>

            </div>
        );
    }
}

ToDoComponent.propTypes = {
    todolist: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};


function mapStateToProps(state, ownProps) {
    const { user } = state.authentication.user;
    const todolist = state.todolist;
    // const stakeHolderQuestions = state.questions.filter(question => question.type == 'stakeholder');
    // const userQuestions = state.questions.filter(question => question.type == 'user');
    // const groupedQuestions = _.map(_.groupBy(state.questions, 'categoryId'));
    return {
        user,
        todolist
    };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(todoActions, dispatch)
    };
  }

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(ToDoComponent);
export { connectedHomePage as ToDoComponent };