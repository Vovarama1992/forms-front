import Card from '@/components/ui/Card'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { getTaskByLabel, getTaskImagesByLabel } from '@/services/TaskApiService'
import { FormItem, Radio, Input } from '@/components/ui'
import parse from 'html-react-parser'

const TaskView = () => {

    const [task, setTask] = useState<Record<string, any> | null>(null)
    // const [images, setImages] = useState<Record<string, any>>(null)
    const [optionSelected, setOption] = useState(null)
    const paramas = useParams<{taskLabel: string}>();

    useEffect(() => {
        if (paramas.taskLabel) {
            try {
                getTaskByLabel(paramas?.taskLabel).then((task) => {
                    console.log(task);
                    if (task.id) {
                        setTask(task);
                    }
                    return task;
                }).then(task => {
                    return getTaskImagesByLabel(task.id.toString(), task.label);
                }).then(images => {
                    console.log(images);
                    // setImages(images);
                });
            } catch (e) {
                console.log(e);
            }
        }
    }, [paramas.taskLabel]);

    return (
        <>
            <h3 className="h3 mb-5">Просмотр задания</h3>
            {task && (
                <>
                    <Card>
                        <h4>{task.label}</h4>
                        <div className="mt-2">
                            {parse(task.description)}
                        </div>
                    </Card>
                    <Card className="mt-5">
                        <h4>
                            Изображения
                        </h4>
                    </Card>
                    <Card className="mt-5">
                        <h4>Выберите ответ</h4>
                        <div className="mt-5">
                            <Radio.Group
                                vertical
                                value={optionSelected}
                                onChange={setOption}
                            >
                                {task?.options.map((option) => {
                                    return <Radio value={option.id} key={option.id}> { option.label } </Radio>
                                })}
                            </Radio.Group>
                        </div>
                    </Card>
                    { task.inputs.length > 0 && (
                        <Card className="mt-5">
                            <h4>Дополнительные вопросы</h4>
                            {
                                task.inputs.map(input => {
                                    return (
                                        <FormItem key={input.id} className="mt-4" label={input.label}>
                                            <Input type="text" name="fieldA" placeholder="Введите ваш ответ" />
                                        </FormItem>
                                    )
                                })
                            }
                        </Card>
                    ) }
                </>
            )}
        </>
    )
}

export default TaskView

