import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles


export default function Editor() {
    const defaultRTF = require('../assets/resume.rtf'); // Replace this with the path to your default RTF file
    const [editorValue, setEditorValue] = useState(
        `<h2><strong>Header</strong></h2>
        <p><strong>Name:</strong> Manish Balamurugan</p>
        <p><strong>Email: </strong>mb2mcc@virginia.edu</p>
        <p><strong>Number:</strong> 7038689973</p>
        <p><br></p>
        <p><strong>Permanent Address: </strong>4215 Mozart Brigade Ln, Fairfax, VA 22033</p>
        <p><strong>Current Address:</strong> 739 Madison Ave, Charlottesville, VA 22903</p>
        <p><br></p>
        
        <h2><strong>Education</strong></h2>
        <p><strong>University of Virginia,</strong> Charlottesville, VA</p>
        <p><strong>Bachelor of Arts, Computer Science</strong><em> August 2020 - May 2024</em></p>
        <p>Notable Courses: Programming and Data Representation, Algorithms, Machine Learning, Advanced Software Development, Computer Architecture, Theory of Computation, Foundation of Statistics, Advanced Investments: Principles of Securities Trading.</p>
        <p>&nbsp;</p>
        
        <h2><strong>Experience</strong></h2>
        <p><strong>University of Virginia Darden School of Business,</strong> Charlottesville, VA</p>
        <p><em>Teaching Assistant October 2023 - Present</em></p>
        <ul>
          <li>Guided students with bootstrapping applications with and on OpenAI's foundation AI models.</li>
          <li>Constructed teaching material on content including prompt engineering, LLM-usage, function calling, langchain, and web application skeletons.</li>
        </ul>
        <p>&nbsp;</p>
        <p><strong>Amazon,</strong> Arlington, VA</p>
        <p><em>Software Development Engineer Intern September 2022 - December 2022</em></p>
        <ul>
          <li>Developed an AWS Lambda function-based solution for failed pipeline deployments clean-up; reduced test time by 95%.</li>
          <li>Devised a TypeScript and AWS Lambda-based pipeline for global ads deployment, enhancing deployment speed by over 60%.</li>
          <li>Created an open-source internal tool manually cleaned up S3 resources for failed pipeline with a 90% success rate.</li>
        </ul>
        <p>&nbsp;</p>
        <p><strong>The Johns Hopkins University School of Medicine,</strong> Baltimore, MD</p>
        <p><em>AI/ML Research Intern October 2018 - May 2021</em></p>
        <ul>
          <li>Implemented a machine learning pipeline for reconstructing corrupted ultrasound images achieving 90% accuracy.</li>
          <li>Crafted a proof-of-concept neuroimaging pipeline leveraging TensorFlow and Keras, achieving over 70% accuracy in detecting foreign bodies during neurosurgical procedures.</li>
          <li>Published as a first author in the Frontiers in Biomedical Devices and the SPIE Medical Imaging Journal.</li>
        </ul>
        <p>&nbsp;</p>
        <p><strong>Keva Health,</strong> Boston, MA</p>
        <p><em>Software Engineer Intern December 2020 - March 2021</em></p>
        <ul>
          <li>Spearheaded development of a direct-to-physician platform using React.js and Node.js, resulting in a surge in customer acquisition and engagement rates by over 50%.</li>
          <li>Implemented a deep learning model for adverse drug event (ADE) prediction with over 92% accuracy.</li>
        </ul>
        <p>&nbsp;</p>
        
        <h2><strong>Projects &amp; Research</strong></h2>
        <p><strong>Entropi (https://entropi.app),</strong> Charlottesville, VA</p>
        <p><em>Founder April 2023 - Present</em></p>
        <ul>
          <li>Developed a user research automation platform and launched minimum viable product (MVP) to early design partners comprising of founders, investors, and SME's.</li>
          <li>Built using React for frontend; Python/Flask, AWS, and MongoDB for backend.</li>
        </ul>
        <p>&nbsp;</p>
        <p><strong>Marcus - Medical Screening Chat,</strong> Charlottesville, VA</p>
        <p><em>Lead Developer September 2023 - Present</em></p>
        <ul>
          <li>Lead developer and researcher for Marcus - a LLM backed chatbot for medical screening built on Langchain.</li>
          <li>Developed with React for the frontend; Express, MongoDB, and Google Firebase Hosting and Cloud Functions for backend.</li>
        </ul>
        <p>&nbsp;</p>
        <p><strong>Hyphora (https://hyphora.org/),</strong> Fairfax, VA</p>
        <p><em>Founder September 2019 - March 2021</em></p>
        <ul>
          <li>Built a resource-driven social network for students using React.js and Google Firebase.</li>
          <li>Achieved a peak user base of 3,000+, with a reach impacting 5,000+ high school students.</li>
        </ul>
        <p>&nbsp;</
        `
    );


    const [suggestions, setSuggestions] = useState([]);
    const quillRef = useRef(); // Create a ref

    const generatePrompt = async (text) => {
        // Replace this with your function to call the AI service
        // This is just a placeholder
        return ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'];
    };

    const handleTextSelected = async () => {
        const quillInstance = quillRef.current.getEditor(); // Get the Quill instance
        const range = quillInstance.getSelection(); // Get the current selection
        if (range && range.length > 0) {
            const text = quillInstance.getText(range.index, range.length);
            const promptSuggestions = await generatePrompt(text);
            setSuggestions(promptSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const applySuggestion = (suggestion) => {
        console.log("Suggestion: ", suggestion); // Check the suggestion
    
        const quillInstance = quillRef.current.getEditor();
        console.log("Quill Instance: ", quillInstance); // Check the Quill instance
    
        const range = quillInstance.getSelection();
        console.log("Range: ", range); // Check the range
    
        if (range && range.length > 0) {
            quillInstance.deleteText(range.index, range.length);
            quillInstance.insertText(range.index, suggestion);
            quillInstance.update();
            setEditorValue(quillInstance.getContents());
            setSuggestions([]);
        }
    };

    useEffect(() => {
        console.log("Here: ", editorValue);
        console.log("Here: ", typeof(editorValue));
        console.log({suggestions});
    }, [editorValue])

    return (
        <div className="p-5 m-5 items-center flex-wrap">
            <ReactQuill
                ref={quillRef}
                value={editorValue}
                onChange={(value) => setEditorValue(value)}
                onChangeSelection={handleTextSelected}
                className='h-[700px] w-[50%] mx-auto'
                theme="snow"
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'script': 'sub'}, { 'script': 'super' }],
                        [{ 'indent': '-1'}, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'font': [] }],
                        [{ 'align': [] }],
                        ['clean'],
                        ['link', 'image', 'video']
                    ]
                }}
            />
            {suggestions.length > 0 && (
                <div className="suggestions-panel">
                    {suggestions.map((suggestion, index) => (
                        <button 
                            key={index} 
                            onClick={() => applySuggestion(suggestion)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}