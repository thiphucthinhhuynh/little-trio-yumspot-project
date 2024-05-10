from app.models import db, Business, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_businesses():
    users = db.session.query(User).all()
    gym = Business(
        owner_id=users[0].id,
        name='Lazy Gym',
        address='123 Hello St',
        city='San Mateo',
        state='CA',
        country='USA',
        postal_code='94403',
        category='Gyms',
        phone_number='415-123-4567',
        website='www.lazygym.com',
        description='Welcome to Lazy Gym!',
        price=3
    )
    ramen = Business(
        owner_id=users[1].id,
        name='Ramen Nag',
        address='123 Hi St',
        city='San Francisco',
        state='CA',
        country='USA',
        postal_code='94110',
        category='Restaurants',
        phone_number='415-123-0000',
        website='www.ramennag.com',
        description='Welcome to Ramen Nag!',
        price=2
    )
    coffee = Business(
        owner_id=users[2].id,
        name='Pink Bottle',
        address='123 High St',
        city='San Francisco',
        state='CA',
        country='USA',
        postal_code='94110',
        category='Coffee',
        phone_number='415-123-1111',
        website='www.pinkbottle.com',
        description='Welcome to Pink Bottle!',
        price=1
    )

    businesses = [gym, ramen, coffee]
    for business in businesses:
        db.session.add(business)
    db.session.commit()


def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()