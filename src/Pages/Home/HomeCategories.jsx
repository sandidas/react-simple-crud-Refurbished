import { Button, Card, Group, Image, Text } from '@mantine/core';
import React from 'react';
import MacbookPro from '../../assets/macBookPro.jpg'
import MacbookAir from '../../assets/macbookAir.jpg'
import iMac from '../../assets/iMac.jpg'
import MacMini from '../../assets/macMini.jpg'
import { Link } from 'react-router-dom';


'apiUrl/:id'
const categoriesItems = [
    {
        title: "MacBook Pro",
        slug: "macbook-pro",
        image: MacbookAir,
        link: ""
    }, {
        title: "MacBook Air",
        image: MacbookPro,
        link: ""
    }, {
        title: "iMac",
        image: iMac,
        link: ""
    }

];

{"name":"Apple Watch","slug":"apple-watch"}





const HomeCategories = () => {
    return (
        <section>
            <div className='text-center pt-10 font-bold'><h1>Second-hand Mac categories</h1></div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 pt-10'>

                {
                    categoriesItems.map((categories, i) =>
                        <Card key={i} shadow="sm" p="lg" radius="md" withBorder>
                            <Card.Section component="a">
                                <Image
                                    src={categories?.image}
                                    alt="Apple"
                                />
                            </Card.Section>

                            <Group position="center" mt="md" mb="xs">
                                <Text weight={500}>{categories?.title}</Text>
                            </Group>


                            <Link to={categories?.link} className='w-full text-center bg-green-600'> Book Now   </Link>
                        </Card>
                    )
                }
            </div>
        </section>
    );
};

export default HomeCategories;