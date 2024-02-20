from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, EqualTo, ValidationError

from flask import Flask, render_template, redirect, url_for, flash, jsonify, request, session
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, logout_user, login_required, current_user
from flask_socketio import SocketIO, send
from flask_cors import CORS

from mongoengine import connect,Document, ListField, ReferenceField, StringField
