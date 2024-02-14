import React, { useState } from 'react'
import { Button, Input, LightButton } from '../../../components/Elements';
import { v4 as uuidv4 } from 'uuid';
import Appwrite from '../../../services/Appwrite';
import { useNavigate } from 'react-router-dom';

export type PollOption = {
    id: string;
    value: string;
}


const CreatePoll = () => {
    const navigate = useNavigate()
    const [question, setQuestion] = useState<string>('');
    const [options, setOptions] = useState<PollOption[]>([
        { id: uuidv4(), value: '' },
        { id: uuidv4(), value: '' },
    ]); // Initial empty options

    let appwrite = new Appwrite()

    // Function to handle adding a new option field
    const addOption = () => {
        setOptions([...options, { id: uuidv4(), value: '' }]);
    };

    // Function to handle removing an option field
    const removeOption = (id: string) => {
        setOptions(options.filter((option) => option.id !== id));
    };

    // Function to handle updating an option field
    const updateOption = (id: string, value: string) => {
        const updatedOptions = options.map((option) =>
            option.id === id ? { ...option, value } : option
        );
        setOptions(updatedOptions);
    };

    // Function to handle submitting the poll
    const handleSubmit = async () => {
        // Perform poll submission logic here (e.g., send to server)
        console.log('Submitted poll:', { question, options });
        await appwrite.createPoll({
            question,
            options: options.map(option => option.value)
        })
        // Reset fields after submission
        setQuestion('');
        setOptions([{ id: uuidv4(), value: '' }, { id: uuidv4(), value: '' }]);
        navigate('/dashboard/poll')
    };
    return (
        <div className="max-w-md mx-auto flex flex-col  p-6 rounded-lg ">
            <h2 className="text-xl font-semibold mb-4">Create a Poll</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="question">
                    Question
                </label>
                <Input
                    type="text"
                    id="question"
                    value={question}
                    onChange={(e: any) => setQuestion(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Options</label>
                {options.map((option) => (
                    <div key={option.id} className="flex items-center mb-2 gap-2">
                        <Input
                            type="text"
                            value={option.value}
                            onChange={(e: any) => updateOption(option.id, e.target.value)}
                        />
                        {options.length > 2 && (
                            <LightButton
                                key={option.id}
                                type="button"
                                onClick={() => removeOption(option.id)}
                                variant='error'
                            >
                                Remove
                            </LightButton>
                        )}
                    </div>
                ))}
                <LightButton
                    type="button"
                    onClick={addOption}
                    className='ml-auto mr-0 !block'
                // className="py-2 px-3 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
                >
                    Add Option
                </LightButton>
            </div>
            <LightButton
                type="button"
                onClick={handleSubmit}

            >
                Submit Poll
            </LightButton>
        </div>
    )
}

export default CreatePoll