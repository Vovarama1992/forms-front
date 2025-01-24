import React from "react";
import { Controller, useFieldArray } from 'react-hook-form'
import NestedArray from "./NestedAnwsers";
import { Button, FormItem, Input } from '@/components/ui'
import { HiMinus } from 'react-icons/hi'

export default function FormQuestions({ control, errors, register, setValue, getValues }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "customQuestions"
    });

    return (
            <div className="mt-5">
                {fields.map((item, index) => {
                    return (
                        <div className="mt-5 mb-5" key={item.id}>
                            <FormItem
                                label="Вопрос"
                                invalid={Boolean(errors.customQuestions?.[index]?.name?.message)}
                                errorMessage={errors.customQuestions?.[index]?.name?.message}
                            >
                                <Controller
                                    name={`customQuestions.${index}.name`}
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
                            <Button
                                type="button"
                                shape="circle"
                                size="sm"
                                icon={<HiMinus />}
                                onClick={() =>remove(index)}
                            />
                            <NestedArray nestIndex={index} {...{ control, register }}/>
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
