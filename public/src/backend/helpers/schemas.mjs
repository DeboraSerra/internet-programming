export const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_REGEX = /(\d{3})-(\d{3})-(\d{3})/;

const emailSchema = (email = "") => {
  if (!email)
    return {
      success: false,
      error: { field: "email", message: "E-mail is required" },
      data: null,
    };
  if (email && !EMAIL_REGEX.test(email))
    return {
      success: false,
      error: { field: "email", message: "E-mail format is invalid" },
      data: null,
    };

  return {
    success: true,
    error: [],
    data: { email },
  };
};

const idSchema = (id = "") => {
  if (!id?.trim() || id?.trim().length !== 24) {
    return {
      success: false,
      error: { field: "id", message: "Id format is invalid" },
      data: null,
    };
  }
  return {
    success: true,
    error: [],
    data: { id },
  };
};

const createUserSchema = (user) => {
  const { email, name = "", photo = "", birthday = "", phone = "" } = user;
  const validations = [];
  if (!email)
    validations.push({ field: "email", message: "E-mail is required" });
  if (email && !EMAIL_REGEX.test(email))
    validations.push({ field: "email", message: "E-mail format is invalid" });
  if (name?.trim() && name?.trim().length < 4)
    validations.push({
      field: "name",
      message: "Name must be at least 4 characters long",
    });
  if (photo?.trim()) {
    try {
      new URL(photo);
    } catch {
      validations.push({
        field: "photo",
        message: "Photo must be a valid URL",
      });
    }
  }
  if (birthday?.trim() && isNaN(Date.parse(birthday))) {
    validations.push({
      field: "birthday",
      message: "Birthday must be a valid date",
    });
  }
  if (phone?.trim() && !PHONE_REGEX.test(phone.trim())) {
    validations.push({
      field: "phone",
      message: "Phone must be the format '000-000-0000'",
    });
  }
  return {
    success: validations.length === 0,
    error: validations,
    data:
      validations.length !== 0
        ? null
        : Object.entries(user).reduce(
            (acc, [key, value]) =>
              value === "" ? acc : { ...acc, [key]: value },
            {}
          ),
  };
};

const updateUserSchema = (user) => {
  const fieldsResult = createUserSchema(user);
  const idResult = idSchema(user.id);
  return {
    success: fieldsResult.success && idResult.success,
    error: { ...fieldsResult.error, ...idResult.error },
    data: fieldsResult.success && idResult.success ? user : null,
  };
};

const createTaskSchema = (task) => {
  const { name, description, date, priority = 1, userId } = task;
  const validations = [];
  if (!name)
    validations.push({
      field: "name",
      message: "Name is required",
    });
  if (name?.trim().length < 4)
    validations.push({
      field: "name",
      message: "Name must be at least 4 characters long",
    });
  if (description?.trim() && description.length < 4) {
    validations.push({
      field: "description",
      message: "Description must be at least 4 characters long",
    });
  }
  if (isNaN(Date.parse(date))) {
    validations.push({
      field: "date",
      message: "Date must be a valid date",
    });
  }
  if (
    typeof priority !== "number" ||
    isNaN(priority) ||
    priority < 1 ||
    priority > 5
  ) {
    validations.push({
      field: "priority",
      message: "Priority must be between 1 and 5",
    });
  }
  if (
    !userId?.trim() ||
    typeof userId !== "string" ||
    userId?.trim().length !== 24
  ) {
    validations.push({
      field: "userId",
      message: "userId must be a valid Id",
    });
  }
  return {
    success: validations.length !== 0,
    error: validations,
    data:
      validations.length === 0
        ? null
        : Object.entries(task).reduce((acc, [key, value]) => {
            if (key === "date") return { ...acc, [key]: new Date(value) };
            if (key === "priority") return { ...acc, [key]: parseInt(value) };
            return { ...acc, [key]: value };
          }, {}),
  };
};

const updateTaskSchema = (task) => {
  const fieldsResult = createTaskSchema(task);
  const idResult = idSchema(task.id);
  return {
    success: fieldsResult.success && idResult.success,
    error: { ...fieldsResult.error, ...idResult.error },
    data: fieldsResult.success && idResult.success ? Object.entries(task).reduce((acc, [key, value]) => {
      if (key === "date") return { ...acc, [key]: new Date(value) };
      if (key === "priority") return { ...acc, [key]: parseInt(value) };
      return { ...acc, [key]: value };
    }, {}) : null,
  };
};

export {
  createTaskSchema,
  createUserSchema,
  emailSchema,
  idSchema,
  updateTaskSchema,
  updateUserSchema,
};
