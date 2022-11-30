import { Container, Title, Accordion, createStyles } from '@mantine/core';

import React from 'react';
const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        minHeight: 650,
    },

    title: {
        marginBottom: theme.spacing.xl * 1.5,
    },

    item: {
        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.lg,

        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },
}));

const Blogs = () => {
 
    const { classes } = useStyles();

    return (
        <Container size="sm" className={classes.wrapper}>
            <Title align="center" className={classes.title}>
                BLOGS
            </Title>

            <Accordion variant="separated">
                <Accordion.Item className={classes.item} value="reset-password">
                    <Accordion.Control>What are the different ways to manage a state in a React application?</Accordion.Control>
                    <Accordion.Panel>
                        We have to set initial state value inside constructor function and set click event handler of the element upon which click, results in changing state. Then pass the function to the click handler and change the state of the component inside the function using setState.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="another-account">
                    <Accordion.Control>How does prototypical inheritance work?</Accordion.Control>
                    <Accordion.Panel>
                        The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="newsletter">
                    <Accordion.Control>What is a unit test? Why should we write unit tests?</Accordion.Control>
                    <Accordion.Panel>
                        The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="credit-card">
                    <Accordion.Control>React vs. Angular vs. Vue?</Accordion.Control>
                    <Accordion.Panel>React is a UI library, Angular is a fully-fledged front-end framework, while Vue. js is a progressive framework. They can be used almost interchangeably to build front-end applications, but they're not 100 percent the same, so it makes sense to compare them and understand their differences</Accordion.Panel>
                </Accordion.Item>

            </Accordion>
        </Container>
    );
};

export default Blogs;