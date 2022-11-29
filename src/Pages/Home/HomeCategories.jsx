import { Button, Card, Group, Image, Text } from '@mantine/core';
import React from 'react';
import MacbookPro from '../../assets/macBookPro.jpg'
import MacbookAir from '../../assets/macbookAir.jpg'
import iMac from '../../assets/iMac.jpg'
import MacMini from '../../assets/macMini.jpg'
import { Link } from 'react-router-dom';



const categoriesItems = [
    {
        title: "MacBook Pro",
        image: MacbookAir,
        slug: "macbook-pro"
    }, {
        title: "MacBook Air",
        image: MacbookPro,
        slug: "macbook-air"
    }, {
        title: "iMac",
        image: iMac,
        slug: "imac"
    }

];
/*
const categoriesItems = [
    {
        title: "MacBook Pro",
        slug: "macbook-pro",
        image: "https://ibb.co/rws3yKm",

    }, {
        title: "MacBook Air",
        slug: "macbook-air",
        image: "https://ibb.co/VLXnKBZ",

    }, {
        title: "iMac",
        slug: "imac",
        image: "https://ibb.co/m6HVj7m",

    }, {
        title: "Mac Mini",
        slug: "mac-mini",
        image: "",
    }, {
        title: "Mac Studio",
        slug: "mac-studie",
        image: "",
    }
];

*/


const HomeCategories = () => {
    return (
        <section>
            <div className='text-center pt-10 font-bold'><h1>Second-hand Mac categories</h1></div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 pt-10'>

                {
                    categoriesItems.map((categories, i) =>
                        <Card key={i} shadow="sm" p="lg" radius="md" withBorder className='flex flex-col'>
                            <Card.Section component="a">
                                <Image
                                    src={categories?.image}
                                    alt="Apple"
                                />
                            </Card.Section>

                            <Group position="center" mt="md" mb="xs">
                                <Text weight={500}>{categories?.title}</Text>
                            </Group>


                            <Link to={`/categories/${categories?.slug}`} className='w-full text-center bg-red-600 px-3 py-3 hover:bg-red-900 rounded-md text-white'> Visit Now   </Link>
                        </Card>
                    )
                }
            </div>
        </section>
    );
};

export default HomeCategories;