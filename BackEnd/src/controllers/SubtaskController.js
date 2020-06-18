const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/tasks', 
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
);

const Task = mongoose.model('task', taskSchema);

module.exports = {
    async create(req, res) {
        const id = req.params.id
        const { subTask } = req.body;

        Task.find(
            { _id: id },
            (err, task) => {
                if (err) {
                    console.error(err);
                } else if ( task[0].subTasks.length < 1 ) {
                    Task.findOneAndUpdate({ _id: id }, { subTasks: subTask }, (error, modTask) => {
                        if (error) { console.error(error) } else {
                            return res.json(modTask);
                        }
                    });
                } else {
                    const existingSubtasks = task[0].subTasks.join(',');
                    const newSubtasks = existingSubtasks + ',' + subTask;
                    const subtasksArray = newSubtasks.split(',');

                    Task.findOneAndUpdate({ _id: id }, { subTasks: subtasksArray }, (error, modTask) => {
                        if (error) { console.error(error) } else {
                            return res.json(modTask);
                        }
                    });
                }
        });

    },

    async delete(req, res) {
        const task_id = req.params.id;
        const subtask_index = req.params.index;

        Task.find({ _id: task_id }, (err, task) => {
            if (err) {
                console.error(err);
            } else {
                const subtasks = task[0].subTasks;
                const deletedSubtask = subtasks.splice(subtask_index, 1);

                Task.findByIdAndUpdate({ _id: task_id }, { subTasks: subtasks }, (err, task) => {
                    if (err) {
                        console.error(err);
                    } else {
                        return res.json(task);
                    }
                });
            }
        });

    },
}