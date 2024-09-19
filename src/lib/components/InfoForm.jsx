'use client'
import React, { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import InputField from '@/lib/components/InputField'
import schema from '@/lib/validationSchema'



const InfoForm = ({
    isLoading,
    setIsLoading,
    resumeData,
    setResumeData,
    generatedResume,
    setGeneratedResume,
}) => {

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
        defaultValues: {
            experiences: [],
            skills: [],
            fullName: '',
            email: '',
            linkedinURL: '',
            phone: '',
            summary: '',
        },
    });

    const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
        control,
        name: 'experiences',
    });

    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
        control,
        name: 'skills',
    });



    const submitFnt = async (data) => {
        setIsLoading(true);
        try {
            setResumeData(data);
            
           const res= await fetch('/api/resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const responseBody = await res.json();
            console.log("responseBody: ",responseBody)
            const { resumeId } = responseBody;
            console.log('resume id :' , resumeId)
            //push in new tab with resume data
            window.open(`/resume-preview/${resumeId}`, '_blank');
        }
        catch (error) {
            console.error(error);
            toast.error("Error generating resume");
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <form onSubmit={handleSubmit(submitFnt)} noValidate style={formStyles}>
            <InputField
                label="Full Name"
                name="fullName"
                register={register}
                required={true}
                errors={errors.fullName?.message}
            />

            <InputField
                label="Email"
                name="email"
                type="email"
                register={register}
                required={true}
                errors={errors.email?.message}
            />

            <InputField
                label="Linkedin Url"
                name="linkedinURL"
                register={register}
                required={true}
                errors={errors.linkedinURL?.message}
            />

            <InputField
                label="Phone Number"
                name="phone"
                type="tel"
                register={register}
                required={true}
                errors={errors.phone?.message}
            />

            <InputField
                label="Professional Summary"
                name="summary"
                register={register}
                isTextArea={true}
                errors={errors.summary?.message}
            />

            <h3 style={sectionHeadingStyles}>Professional Experiences</h3>
            {experienceFields.map((field, index) => (
                <div key={field.id} style={fieldContainerStyles}>
                    <InputField
                        label={`Job Title ${index + 1}`}
                        name={`experiences[${index}].jobTitle`}
                        register={register}
                        required={true}
                        errors={errors.experiences?.[index]?.jobTitle?.message}
                    />
                    <InputField
                        label={`Company ${index + 1}`}
                        name={`experiences[${index}].company`}
                        register={register}
                        required={true}
                        errors={errors.experiences?.[index]?.company?.message}
                    />
                    <InputField
                        label={`Description ${index + 1}`}
                        name={`experiences[${index}].description`}
                        register={register}
                        isTextArea={true}
                        errors={errors.experiences?.[index]?.description?.message}
                    />
                    <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        style={removeButtonStyles}
                    >
                        Remove Experience
                    </button>
                </div>
            ))}
            <button type="button" onClick={() => appendExperience({})} style={addButtonStyles}>
                Add Experience
            </button>

            <h3 style={sectionHeadingStyles}>Skills</h3>
            <div className="grid grid-cols-2">
                {skillFields.map((field, index) => (
                    <div key={field.id} style={fieldContainerStyles}>
                        <InputField
                            label={`Skill ${index + 1}`}
                            name={`skills[${index}].name`}
                            register={register}
                            required={true}
                            errors={errors.skills?.[index]?.name?.message}
                        />
                        <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            style={removeButtonStyles}
                        >
                            Remove Skill
                        </button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={() => appendSkill({})} style={addButtonStyles}>
                Add Skill
            </button>

            <button disabled={isLoading} type="submit" style={submitButtonStyles}>
               {isLoading ? "Loading...": "Generate Resume"} 
            </button>
        </form>
    )
}

export default InfoForm;




// Styling for components

const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
};

const sectionHeadingStyles = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#333',
};

const fieldContainerStyles = {
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '10px',
    marginBottom: '15px',
    backgroundColor: '#fff',
};

const removeButtonStyles = {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
};

const addButtonStyles = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '10px 0',
};

const submitButtonStyles = {
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
};


