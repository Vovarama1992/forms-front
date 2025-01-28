import React from "react";
import { Controller, useFieldArray } from 'react-hook-form'
import { Button, FormItem, Input } from '@/components/ui'
import { HiMinus } from 'react-icons/hi'

export default function FormQuestions({ control, errors, register }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "customQuestions"
    });

    return (
            <div className="mt-5">
                {fields.map((item, index) => {
                    return (
                        <div key={item.id} className="mt-5 mb-5">
                            <FormItem
                                label="Поле"
                                invalid={Boolean(errors.customQuestions?.[index]?.label)}
                                errorMessage={errors.customQuestions?.[index]?.label?.message}
                            >
                                <Controller
                                    name={`customQuestions.${index}.label`}
                                    control={control}
                                    render={({ field }) =>
                                        <Input
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Введите вопрос"
                                            {...field}
                                        />
                                    }
                                />
                            </FormItem>
                            <FormItem
                                label="Описание"
                                invalid={Boolean(errors.customQuestions?.[index]?.description)}
                                errorMessage={errors.customQuestions?.[index]?.description?.message}
                            >
                                <Controller
                                    name={`customQuestions.${index}.description`}
                                    control={control}
                                    render={({ field }) =>
                                        <Input
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Введите описание"
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
                            {/*<NestedArray nestIndex={index} {...{ control, register, errors }} />*/}
                        </div>
                    );
                })}
                <Button
                    type="button"
                    onClick={() => {
                        append({ value: "" });
                    }}
                >
                    Добавить вопрос
                </Button>
            </div>
    );
}
