import React from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import cn from 'clsx';

import type { Superhero, SuperheroEditInput } from '../../types/superhero.types';

import { Button, Field, Icon, UploadField } from '../../components/ui';
import formStyles from './manage-form.module.scss';

interface Props {
  superhero: Superhero;
  goBackHome: VoidFunction;
  updateSuperhero: (values: SuperheroEditInput) => void;
}

export const EditForm: React.FC<Props> = ({ superhero, updateSuperhero, goBackHome }) => {
  const [superpowers, setSuperpowers] = React.useState<string[]>(
    superhero.superpowers ?? []
  );
  const [newSuperpower, setNewSuperpower] = React.useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<SuperheroEditInput>({
    mode: 'onBlur',
    values: {
      nickname: superhero.nickname ?? '',
      realName: superhero.realName ?? '',
      catchPhrase: superhero.catchPhrase ?? '',
      originDescription: superhero.originDescription ?? '',
      superpowers: superhero.superpowers ?? [],
      images: superhero.images ?? [],
    },
  });

  const handleChangeSuperPower: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewSuperpower(e.target.value);
  };

  const handleAddSuperpower = () => {
    if (!newSuperpower.trim()) {
      return;
    }

    setSuperpowers((prev) => {
      return [newSuperpower.trim(), ...prev];
    });

    setNewSuperpower('');
  };

  const handleDeleteSuperpower = (index: number) => () => {
    setSuperpowers((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  };

  const onSubmit: SubmitHandler<SuperheroEditInput> = async (values) => {
    const data: SuperheroEditInput = {
      ...values,
      superpowers,
    };

    updateSuperhero(data);
  };

  return (
    <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={formStyles.fields}>
        <Field
          className={formStyles.field}
          label="Nickname"
          error={errors.nickname}
          {...register('nickname', {
            required: 'Nickname is required',
          })}
        />
        <Field
          className={formStyles.field}
          label="Real name"
          error={errors.realName}
          {...register('realName', {
            required: 'Real name is required',
          })}
        />
        <div className={formStyles.description}>
          <label>
            <span>Origin description</span>
            <textarea
              placeholder="Origin description"
              {...register('originDescription', {
                required: 'Origin description is required',
              })}
            />
          </label>
          {errors.originDescription && (
            <div className={formStyles.error}>{errors.originDescription.message}</div>
          )}
        </div>
        <Field
          style={{ width: '100%' }}
          className={formStyles.field}
          label="Catch phrase"
          error={errors.catchPhrase}
          {...register('catchPhrase', {
            required: 'Catch phrase is required',
          })}
        />
      </div>
      <div className={cn(formStyles.superpowers, 'max-w-[350px]')}>
        <div className="flex items-start relative">
          <Field
            className={formStyles.field}
            label="New superpower"
            value={newSuperpower}
            onChange={handleChangeSuperPower}
          />
          <Button
            className="p-2 relative top-[34px] -right-4 text-sm"
            size="sm"
            onClick={handleAddSuperpower}
          >
            Add new
          </Button>
        </div>
        {superpowers.map((superpower, index) => (
          <div key={index} className="flex items-center">
            <Field
              value={superpower}
              className={formStyles.field}
              label="Superpower"
              disabled
            />
            <button
              type="button"
              className="relative top-3 -right-2"
              onClick={handleDeleteSuperpower(index)}
            >
              <Icon name="LuTrash" className="size-6 text-primary" />
            </button>
          </div>
        ))}
      </div>
      <Controller
        control={control}
        name="images"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <UploadField
            className={cn(formStyles.field, 'mt-5')}
            label="Images"
            folder={`superheroes/${superhero.id}`}
            value={value}
            onChange={onChange}
            error={error}
          />
        )}
        rules={{
          required: 'At least one image is required',
        }}
      />
      <div className="my-5 flex gap-5">
        <Button type="submit">Save</Button>
        <Button onClick={goBackHome}>Go Back</Button>
      </div>
    </form>
  );
};
