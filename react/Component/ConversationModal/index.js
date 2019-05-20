import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  DialogContent,
  IconButton,
  Typography,
  Button,
  CircularProgress
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import { FormattedMessage } from "react-intl";

import styles from "./styles";
import globalStyles from "../../styles";
import messages from "./messages";

const ConversationModal = ({
  classes,
  isOpen,
  conversation,
  onClose,
  loadMore,
  isLoading,
  disableLoadMore,
  ...rest
}) => (
  <Modal {...rest} open={isOpen} onClose={onClose}>
    <DialogContent className="no-outline">
      <div className={classes.modal}>
        <IconButton onClick={onClose} className={classes.closeIcon}>
          <CloseIcon />
        </IconButton>
        {conversation.map(message => (
          <div key={message.id} className={classes.conversationBody}>
            <div className="display-flex align-center">
              <Typography variant="body2" className="mr05">
                <strong>{message.sender.username}</strong>
              </Typography>
              <Typography variant="caption">{message.created_at}</Typography>
            </div>
            <Typography variant="body1">{message.body}</Typography>
          </div>
        ))}
        {!disableLoadMore && (
          <div className="mt1 text-center">
            <Button
              type="text"
              variant="contained"
              color="secondary"
              size="small"
              onClick={loadMore}
            >
              {isLoading ? (
                <CircularProgress size="20" className={classes.loading} />
              ) : (
                <FormattedMessage {...messages.loadMore} />
              )}
            </Button>
          </div>
        )}
      </div>
    </DialogContent>
  </Modal>
);

ConversationModal.propTypes = {
  classes: PropTypes.object,
  isOpen: PropTypes.bool,
  conversation: PropTypes.array,
  onClose: PropTypes.func,
  loadMore: PropTypes.func,
  isLoading: PropTypes.bool,
  disableLoadMore: PropTypes.bool
};

export default withStyles(globalStyles(styles))(ConversationModal);
