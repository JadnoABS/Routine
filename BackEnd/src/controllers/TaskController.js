const mongoose = require('mongoose');
const express = require('express');

mongoose.connect('mongodb://localhost:27017/tasks', 
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
);

taskSchema = new mongoose.Schema({
    task: String,
    subTasks: Array,
    key: String
});

const Task = mongoose.model('task', taskSchema);

var tasks = {};

module.exports = {
    async index(req, res) {
        Task.find({}, (err, tasks) => {
            if (err) {
                console.log(err);
            } else {
                return res.json(tasks);
            }
        });
    },

    async create(req, res) {
        const { task } = req.body;

        Task.create({ task: task}, (err, newTask) => {
            if (err) {
                console.log(err);
            } else {
                return res.json(newTask);
            }
        })
    },

    async delete(req, res) {
        const task_id = req.params.id;

        Task.findByIdAndDelete({ _id: task_id }, (err, task) => {
            if (err) {
                console.error(err);
            } else {
                return res.json(task);
            }
        })
    },
    
    async deleteAll(req, res) {
        Task.deleteMany({}, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                return res.json(info);
            }
        });
    }
}