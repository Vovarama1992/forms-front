import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { HiMinus } from 'react-icons/hi'
import { useFieldArray, Controller } from 'react-hook-form'

const FormInputs = ({ control, errors, register}) => {

    const { fields, append, remove } = useFieldArray({
        name: 'inputs',
        control
    })

    return (
            <div>
                <div className="mb-10">
                    <h5 className="mb-4">Дополнительные вопросы</h5>
                </div>
                {fields.map((field, index) => (
                    <div key={index}>
                        <FormItem
                            label="Вопрос"
                        >
                            <Controller
                                name={`inputs.${index}.value`}
                                control={control}
                                render={({ field }) =>
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        {...field}
                                    />
                                }
                            />
                        </FormItem>
                        <Button
                            type="button"
                            shape="circle"
                            size="sm"
                            icon={<HiMinus />}
                            onClick={() =>remove(index)}
                        />
                    </div>
                ))}
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        className="ltr:mr-2 rtl:ml-2"
                        onClick={() => {
                            append({
                                value: '',
                            })
                        }}
                    >
                        Добавить вопрос
                    </Button>
                </div>
            </div>
    )
}

export default FormInputs

