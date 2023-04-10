"""empty message

Revision ID: 8be1bc83e823
Revises: e48a4c33ff3f
Create Date: 2023-04-09 22:17:09.666911

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8be1bc83e823'
down_revision = 'e48a4c33ff3f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favourite_playlists',
    sa.Column('favourite_id', sa.Integer(), nullable=False),
    sa.Column('playlist_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['favourite_id'], ['favourites.id'], ),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlists.id'], ),
    sa.PrimaryKeyConstraint('favourite_id', 'playlist_id')
    )
    op.create_table('favourite_tracks',
    sa.Column('favourite_id', sa.Integer(), nullable=False),
    sa.Column('track_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['favourite_id'], ['favourites.id'], ),
    sa.ForeignKeyConstraint(['track_id'], ['tracks.id'], ),
    sa.PrimaryKeyConstraint('favourite_id', 'track_id')
    )
    with op.batch_alter_table('favourites', schema=None) as batch_op:
        batch_op.drop_constraint('favourites_track_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('favourites_playlist_id_fkey', type_='foreignkey')
        batch_op.drop_column('playlist_id')
        batch_op.drop_column('track_id')

    with op.batch_alter_table('playlists', schema=None) as batch_op:
        batch_op.drop_constraint('playlists_user_id_fkey', type_='foreignkey')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('playlists', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('playlists_user_id_fkey', 'users', ['user_id'], ['id'])

    with op.batch_alter_table('favourites', schema=None) as batch_op:
        batch_op.add_column(sa.Column('track_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('playlist_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('favourites_playlist_id_fkey', 'playlists', ['playlist_id'], ['id'])
        batch_op.create_foreign_key('favourites_track_id_fkey', 'tracks', ['track_id'], ['id'])

    op.drop_table('favourite_tracks')
    op.drop_table('favourite_playlists')
    # ### end Alembic commands ###
