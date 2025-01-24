import React from "react";
import { useFieldArray } from "react-hook-form";
import { Input, Button, FormItem } from '@/components/ui'
import { HiMinus } from 'react-icons/hi'

// eslint-disable-next-line react-refresh/only-export-components
export default ({ nestIndex, control, register }) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `test[${nestIndex}].nestedArray`
    });

    return (
        <div>
            {fields.map((item, k) => {
                return (
                    <div key={item.id} style={{ marginLeft: 20 }}>
                        <FormItem
                            label="Ответ"

                        >
                            <Input
                                placeholder="Введите ответ"
                                name={`customQuestions[${nestIndex}].answers[${k}].value`}
                                defaultValue={item.value}
                            />
                        </FormItem>

                        <Button
                            type="button"
                            shape="circle"
                            size="sm"
                            icon={<HiMinus />}
                            onClick={() =>remove(k)}
                        />
                    </div>
                );
            })}

            <Button
                type="button"
                onClick={() =>
                    append({
                        value: "",
                    })
                }
            >
               Добавить ответ
            </Button>
        </div>
    );
};
