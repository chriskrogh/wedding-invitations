"use client";

import { Formik, Form } from "formik";
import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { EXPIRATION_DATE, LABEL_CLASSNAME } from "./consts";

type FormValues = Record<string, string>;

type Props = {
  names: string[];
  olderKids: boolean;
  canPlusOne: boolean;
};

export const AcceptInviteForm: React.FC<Props> = ({
  names,
  olderKids,
  canPlusOne,
}) => {
  const [error, setError] = useState<string>();

  const initialValues: FormValues = useMemo(() => {
    if (names.length > 1) {
      return names.reduce(
        (prev, name) => ({
          ...prev,
          [name]: "1",
        }),
        {} as FormValues
      );
    }
    if (canPlusOne) {
      return { partner: "" };
    }
    return {};
  }, [canPlusOne, names]);

  const validate = useCallback(
    (values: FormValues) => {
      if (names.length === 1) {
        if (!canPlusOne) return;
        if (values.partner === "plusOne") {
          if (!values.partnerName) {
            const message = "Please provide your plus one's name.";
            setError(message);
            return { partnerName: message };
          }
        }
      } else {
        let allUnchecked = true;
        for (const value of Object.values(values)) {
          if (value === "1") {
            allUnchecked = false;
            break;
          }
        }
        if (allUnchecked) {
          const message = "At least one person must attend.";
          setError(message);
          return { [names[0]]: message };
        }
      }
    },
    [canPlusOne, names]
  );

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ values, touched, handleChange, handleBlur, setFieldValue }) => {
        const showError = error && Object.keys(touched).length > 0;
        return (
          <>
            <Form className="py-2">
              <Typography as="h4">{"Can't wait to see you!"}</Typography>
              {olderKids ? (
                <>
                  <div className="h-2" />
                  <Typography as="label">
                    Note: your older kids got their own invites :)
                  </Typography>
                </>
              ) : null}
              {names.length > 1 ? (
                <>
                  <div className="h-4" />
                  {names.map((name, index) => (
                    <div key={name}>
                      {index > 0 ? <div className="h-2" /> : null}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={name}
                          name={name}
                          checked={values[name] === "1"}
                          onClick={() => {
                            setError(undefined);
                            setFieldValue(
                              name,
                              values[name] === "1" ? "0" : "1"
                            );
                          }}
                        />
                        <label htmlFor={name} className={LABEL_CLASSNAME}>
                          {name}
                        </label>
                      </div>
                    </div>
                  ))}
                </>
              ) : canPlusOne ? (
                <>
                  {console.log(values)}
                  <div className="h-4" />
                  <RadioGroup
                    name="partner"
                    onValueChange={(value) => {
                      setError(undefined);
                      setFieldValue("partner", value);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="alone" id="alone" />
                      <label htmlFor="alone" className={LABEL_CLASSNAME}>
                        {"I'll be coming alone"}
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="plusOne" id="plusOne" />
                      <label htmlFor="plusOne" className={LABEL_CLASSNAME}>
                        {"I'll be bringing someone"}
                      </label>
                    </div>
                  </RadioGroup>
                  {values.partner === "plusOne" ? (
                    <>
                      <div className="h-4" />
                      <label htmlFor="partnerName" className={LABEL_CLASSNAME}>
                        {"What's their name?"}
                      </label>
                      <div className="h-1" />
                      <Input
                        id="partnerName"
                        name="partnerName"
                        placeholder="Plus one's name"
                        className="font-serif"
                        value={values.partnerName}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setError(undefined);
                          handleChange(e);
                        }}
                      />
                    </>
                  ) : null}
                </>
              ) : null}
              {showError ? (
                <>
                  <div className="h-2" />
                  <Typography className="text-red-500">{error}</Typography>
                </>
              ) : null}
              <div className="h-4" />
              <Button type="submit" className="font-serif">
                Accept invitation
              </Button>
            </Form>
            <div className="h-4" />
            <Typography as="label">
              {`Please let us know if you'll be attending by ${EXPIRATION_DATE}.`}
            </Typography>
          </>
        );
      }}
    </Formik>
  );
};