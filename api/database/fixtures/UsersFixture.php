<?php namespace Nettineuvoja\Fixtures;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Nettineuvoja\Access\Domain\Model\User;
use Nord\Lumen\Core\Domain\Model\ObjectId;

/**
 * Class UsersFixture
 * @package Nettineuvoja\Fixtures
 */
class UsersFixture extends AbstractFixture implements FixtureInterface, OrderedFixtureInterface
{

    /**
     * @inheritdoc
     */
    public function load(ObjectManager $manager)
    {
        $superuser = new User(new ObjectId(), 'demo@example.com', 'demo12', 'Demo', 'User');

        $manager->persist($superuser);
        $manager->flush();
    }


    /**
     * @inheritdoc
     */
    public function getOrder()
    {
        return 0;
    }
}
