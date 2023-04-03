import { ChangeEvent, useState } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { H1 } from "../components/Text";
import { ethers } from "ethers";
import { abi } from "vote/build/contracts/FeedbackFormFactory.json";

const classMap = {
  inputClasses:
    "w-full mt-6 border rounded-md py-2 px-4 placeholder-gray-400 placeholder-opacity-50",
  labelClasses: "text-primary-black font-medium text-lg",
};

export default function Web() {
  const [questionsInput, setQuestionsInput] = useState<string[]>([""]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    "0x6053370e9000405343251EAe3f1bBeeD2c587840",
    abi,
    signer
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i?: number) => {
    const { name } = e.target;
    if (name === "form_questions" && i !== undefined) {
      const values = [...questionsInput];
      values[i] = e.target.value;
      setQuestionsInput(values);
    } else if (name === "form_title") {
      setTitle(e.target.value);
    } else if (name === "form_description") {
      setDescription(e.target.value);
    }
  };

  const handleDelete = (i: number) => {
    const values = [...questionsInput];
    values.splice(i, 1);
    setQuestionsInput(values);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await contract.createFeedbackForm(questionsInput, title, description);
    } catch (error) {
      console.log(error);
    } finally {
      setQuestionsInput([""]);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <Layout className="bg-gradient-to-br from-[#ebf1ff] via-white to-[#fffff2] min-h-screen">
      <H1 className="mt-20 text-center">Create new feedback form</H1>
      <main className="mt-12">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-10 place-items-end px-12 py-7 shadow-lg rounded-xl bg-[#FEFEFE] max-w-4xl mx-auto mb-10"
        >
          <div className="w-full flex gap-10">
            <div className="w-full flex flex-col">
              <label className={classMap.labelClasses} htmlFor="form_title">
                Form title
              </label>
              <input
                className={classMap.inputClasses}
                required
                onChange={(e) => handleChange(e)}
                value={title}
                placeholder="Title..."
                type="text"
                id="form_title"
                name="form_title"
              />
            </div>
            <div className="w-full flex flex-col">
              <label
                className={classMap.labelClasses}
                htmlFor="form_description"
              >
                Form description
              </label>
              <input
                className={classMap.inputClasses}
                required
                onChange={(e) => handleChange(e)}
                value={description}
                placeholder="Description..."
                type="text"
                id="form_description"
                name="form_description"
              />
            </div>
          </div>
          <div className="w-full flex flex-col">
            <div className="flex flex-col">
              <label className={classMap.labelClasses} htmlFor="form_questions">
                Form questions
              </label>
              <span className="text-sm text-red-400 font ">
                * We only accept 1 to 5 answers, make sure you make 1 to 5
                questions
              </span>
            </div>
            {questionsInput?.map((data: string, i: number) => (
              <div className="flex gap-4" key={i}>
                <input
                  value={data}
                  required
                  onChange={(e) => handleChange(e, i)}
                  className={classMap.inputClasses}
                  placeholder="How likely are you to recommend this event to a friend?"
                  type="text"
                  id="form_questions"
                  name="form_questions"
                />
                {questionsInput?.length > 1 && (
                  <Button
                    onClick={() => handleDelete(i)}
                    type="button"
                    className="bg-red-500 h-fit w-fit max-w-[200px] mt-6"
                  >
                    Delete
                  </Button>
                )}
              </div>
            ))}
            <Button
              onClick={() => setQuestionsInput([...questionsInput, ""])}
              type="button"
              className="py-2 max-w-[200px] mt-6"
            >
              Add new question
            </Button>
          </div>
          <Button type="submit" className="py-2 max-w-[200px]">
            Create Form
          </Button>
        </form>
      </main>
    </Layout>
  );
}
