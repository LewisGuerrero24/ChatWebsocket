from wtforms.validators import DataRequired, Length, EqualTo, ValidationError

# Protect CSRF
from flask_wtf.csrf import generate_csrf
from flask_wtf.csrf import CSRFProtect
#from oauth_utils import is_oauth

import datetime
from datetime import datetime, timedelta, timezone
import secrets
from functools import wraps

#Security login
from flask import Flask, render_template, redirect, url_for, flash, jsonify, request, session ,abort, make_response, send_file
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO, send, join_room, leave_room, emit
from flask_cors import CORS
from flask_principal import Principal, RoleNeed, Permission, identity_loaded
from flask_security import Security,roles_required, MongoEngineUserDatastore, login_required, roles_accepted, logout_user, RoleMixin, UserMixin
from flask_login import LoginManager, login_user, logout_user, current_user
from werkzeug.utils import secure_filename
from flask_mail import Mail, Message

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, unset_jwt_cookies, get_jwt
import json

import uuid
import io
import threading

from mongoengine import connect,Document,   DictField, ListField, StringField, FileField, IntField, DateTimeField, ReferenceField, EmbeddedDocument, EmbeddedDocumentField,EmbeddedDocumentListField, BooleanField
