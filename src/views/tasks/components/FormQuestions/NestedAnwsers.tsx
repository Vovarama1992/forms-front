import React from "react";
import { Controller, useFieldArray } from 'react-hook-form'
import { Input, Button, FormItem } from '@/components/ui'
import { HiMinus } from 'react-icons/hi'

// eslint-disable-next-line react-refresh/only-export-components
export default ({ nestIndex, control, errors }) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `customQuestions[${nestIndex}].answers`
    });

    console.log(fields);

    return (
        <div>
            {fields.map((item, k) => {
                return (
                    <div key={item.id}>
                        <FormItem
                            label="Ответ"
                            invalid={Boolean(errors.customQuestions?.[nestIndex]?.answers[k]?.value)}
                            errorMessage={errors.customQuestions?.[nestIndex]?.answers[k]?.value?.message}
                        >
                            <Controller
                                name={`customQuestions[${nestIndex}].answers[${k}].value`}
                                control={control}
                                render={({ field }) =>
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Введите ответ"
                                        {...field}
                                    />
                                }
                            />
                        </FormItem>
                        {/*<FormItem*/}
                        {/*    label="Ответ"*/}
                        {/*>*/}

                        {/*    <Input*/}
                        {/*        placeholder="Введите ответ"*/}
                        {/*        name={`customQuestions[${nestIndex}].answers[${k}].value`}*/}
                        {/*        defaultValue={item.value}*/}
                        {/*    />*/}
                        {/*</FormItem>*/}

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
