const QUESTIONS = {
    '1': [ // Technology
        {
            question: 'What does CPU stand for?',
            options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Unit', 'Control Processing Unit'],
            correct: 0
        },
        {
            question: 'Which programming language is known as the "mother of all languages"?',
            options: ['C', 'Assembly', 'Fortran', 'COBOL'],
            correct: 1
        },
        {
            question: 'What does HTML stand for?',
            options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'],
            correct: 0
        },
        {
            question: 'What is the primary function of an operating system?',
            options: ['Run applications', 'Store data', 'Connect to internet', 'All of the above'],
            correct: 3
        },
        {
            question: 'Which company developed the Windows OS?',
            options: ['Apple', 'Microsoft', 'Google', 'IBM'],
            correct: 1
        },
        {
            question: 'What does URL stand for?',
            options: ['Uniform Resource Locator', 'Universal Reference Link', 'User Resource Location', 'Unified Resource Link'],
            correct: 0
        },
        {
            question: 'Which of these is a type of computer memory?',
            options: ['RAM', 'ROM', 'Both A and B', 'Neither'],
            correct: 2
        },
        {
            question: 'What is the binary system based on?',
            options: ['0 and 1', '1 and 2', 'A and B', 'X and Y'],
            correct: 0
        },
        {
            question: 'Which device is used to input data into a computer?',
            options: ['Monitor', 'Printer', 'Keyboard', 'Speaker'],
            correct: 2
        },
        {
            question: 'What does AI stand for?',
            options: ['Artificial Intelligence', 'Automated Interface', 'Advanced Integration', 'Active Internet'],
            correct: 0
        }
    ],
    '2': [ // Science
        {
            question: 'What is the chemical symbol for water?',
            options: ['H2O', 'CO2', 'O2', 'NaCl'],
            correct: 0
        },
        {
            question: 'Which planet is known as the Red Planet?',
            options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
            correct: 1
        },
        {
            question: 'What is the speed of light?',
            options: ['299,792,458 m/s', '300,000,000 m/s', '150,000,000 m/s', '200,000,000 m/s'],
            correct: 0
        },
        {
            question: 'What is the center of an atom called?',
            options: ['Electron', 'Proton', 'Nucleus', 'Neutron'],
            correct: 2
        },
        {
            question: 'Which gas do plants absorb from the atmosphere?',
            options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
            correct: 1
        },
        {
            question: 'What is the boiling point of water at sea level?',
            options: ['0°C', '50°C', '100°C', '150°C'],
            correct: 2
        },
        {
            question: 'Which organ pumps blood in the human body?',
            options: ['Liver', 'Heart', 'Kidney', 'Lung'],
            correct: 1
        },
        {
            question: 'What is the largest planet in our solar system?',
            options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
            correct: 2
        },
        {
            question: 'What type of energy does a moving car have?',
            options: ['Potential', 'Kinetic', 'Thermal', 'Chemical'],
            correct: 1
        },
        {
            question: 'Which scientist developed the theory of relativity?',
            options: ['Newton', 'Einstein', 'Galileo', 'Darwin'],
            correct: 1
        }
    ],
    '3': [ // History
        {
            question: 'In which year did World War II end?',
            options: ['1945', '1939', '1950', '1940'],
            correct: 0
        },
        {
            question: 'Who was the first President of the United States?',
            options: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams'],
            correct: 1
        },
        {
            question: 'Which ancient civilization built the pyramids?',
            options: ['Romans', 'Greeks', 'Egyptians', 'Mayans'],
            correct: 2
        },
        {
            question: 'When did the American Civil War begin?',
            options: ['1861', '1857', '1870', '1848'],
            correct: 0
        },
        {
            question: 'Who painted the Mona Lisa?',
            options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Michelangelo'],
            correct: 1
        },
        {
            question: 'Which empire was ruled by Julius Caesar?',
            options: ['Greek', 'Roman', 'Persian', 'Ottoman'],
            correct: 1
        },
        {
            question: 'When did the Industrial Revolution begin?',
            options: ['18th century', '19th century', '17th century', '20th century'],
            correct: 0
        },
        {
            question: 'Who was the first man to walk on the moon?',
            options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'],
            correct: 1
        },
        {
            question: 'Which war was fought between the North and South regions of the US?',
            options: ['World War I', 'Civil War', 'Revolutionary War', 'Vietnam War'],
            correct: 1
        },
        {
            question: 'When was the Declaration of Independence signed?',
            options: ['1776', '1789', '1800', '1765'],
            correct: 0
        }
    ],
    '4': [ // Math
        {
            question: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            correct: 1
        },
        {
            question: 'What is the square root of 16?',
            options: ['2', '4', '6', '8'],
            correct: 1
        },
        {
            question: 'What is 10 divided by 2?',
            options: ['3', '4', '5', '6'],
            correct: 2
        },
        {
            question: 'What is 5 × 6?',
            options: ['25', '30', '35', '40'],
            correct: 1
        },
        {
            question: 'What is the value of π (pi) approximately?',
            options: ['2.14', '3.14', '4.14', '5.14'],
            correct: 1
        },
        {
            question: 'What is 100 - 25?',
            options: ['65', '70', '75', '80'],
            correct: 2
        },
        {
            question: 'What is 7²?',
            options: ['49', '56', '63', '70'],
            correct: 0
        },
        {
            question: 'What is the perimeter of a square with side 5?',
            options: ['15', '20', '25', '30'],
            correct: 1
        },
        {
            question: 'What is 1/2 as a decimal?',
            options: ['0.1', '0.2', '0.5', '0.7'],
            correct: 2
        },
        {
            question: 'What is the area of a circle with radius 3? (Use π=3.14)',
            options: ['18.84', '28.26', '37.68', '47.1'],
            correct: 1
        }
    ]
};

export default QUESTIONS;