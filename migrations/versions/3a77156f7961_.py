"""empty message

Revision ID: 3a77156f7961
Revises: 63c79ba2f5b2
Create Date: 2023-04-25 09:16:37.472622

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3a77156f7961'
down_revision = '63c79ba2f5b2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tracks', schema=None) as batch_op:
        batch_op.drop_constraint('tracks_artist_spotify_id_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tracks', schema=None) as batch_op:
        batch_op.create_unique_constraint('tracks_artist_spotify_id_key', ['artist_spotify_id'])

    # ### end Alembic commands ###