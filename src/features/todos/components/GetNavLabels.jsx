import React from 'react';

const GetNavLabels = ({ labels }) => {
    return labels.map((label, index) => (
        <li
            key={index}
            //    onClick={() => {
            //     const filterMails = this.state.allToDos.filter(todo => todo.labels.includes(label.id));
            //     this.setState({
            //       loader: true,
            //       currentTodo: null,
            //       toDos: filterMails
            //     });
            //     setTimeout(() => {
            //       this.setState({loader: false});
            //     }, 1500);
            //   }
            //   }
        >
            <span className="gx-link">
                <i className={`icon icon-circle gx-text-${label.color}`} />
                <span>{label.title}</span>
            </span>
        </li>
    ));
};

export default GetNavLabels;
