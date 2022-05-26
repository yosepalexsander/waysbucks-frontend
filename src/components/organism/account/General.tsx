import { Form } from 'formik';
import React from 'react';

import { Button } from '@/components/atoms';
import { InputField } from '@/components/moleculs';

export const General = () => {
  return (
    <Form className="flex flex-col">
      <div className="flex justify-between">
        <h1 className="h4">Profile</h1>
        <Button type="submit" variant="outlined">
          Save
        </Button>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-1">
          <p className="text-sm">Name</p>
          <InputField name="name" />
        </div>
        <div className="flex flex-col space-y-1">
          <p className="text-sm">Email</p>
          <InputField name="email" isDisabled />
        </div>
        <div className="flex flex-col space-y-1">
          <p className="text-sm">Phone</p>
          <InputField name="phone" />
        </div>
      </div>
    </Form>
  );
};
