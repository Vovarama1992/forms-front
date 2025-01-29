import React from "react";
import { Controller, useFieldArray } from 'react-hook-form'
import { Button, FormItem, Input, Upload } from '@/components/ui'
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
                        <div key={item.id} className="mt-5 w-full flex flex-wrap mb-5">
                            <div className="flex w-full flex-wrap">
                                <FormItem
                                    className="w-full"
                                    label="Название"
                                    layout="vertical"
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
                                    className="w-full"
                                    layout="vertical"
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
                            </div>
                            <div className="w-full">
                                <FormItem
                                    asterisk
                                    label="Изображение"
                                    invalid={Boolean(
                                        errors.customQuestions?.[index]?.image,
                                    )}
                                    errorMessage={
                                        errors.customQuestions?.[index]?.image?.message
                                    }
                                >
                                    <Controller
                                        name={`customQuestions.${index}.image`}
                                        control={control}
                                        render={({ field }) => (
                                            <Upload
                                                fileList={field.value}
                                                onFileRemove={(files) =>
                                                    field.onChange(
                                                        files,
                                                    )
                                                }
                                                onChange={(files) =>
                                                    field.onChange(
                                                        files,
                                                    )
                                                }
                                            >
                                                <Button onClick={(e) => e.preventDefault()}>
                                                    {' '}
                                                    Выбрать изображение{' '}
                                                </Button>
                                            </Upload>
                                        )}
                                    />
                                </FormItem>
                                <FormItem
                                    layout="vertical"
                                    className="w-full"
                                    label="Описание изображения"
                                    invalid={Boolean(
                                        errors.customQuestions?.[index]?.imageDescription,
                                    )}
                                    errorMessage={
                                        errors.customQuestions?.[index]?.imageDescription?.message
                                    }
                                >
                                    <Controller
                                        name={`customQuestions.${index}.imageDescription`}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Введите описание"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                                <Button
                                    className=""
                                    type="button"
                                    shape="circle"
                                    size="sm"
                                    icon={<HiMinus />}
                                    onClick={() =>remove(index)}
                                > Удалить </Button>
                            </div>
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
